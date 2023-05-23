import { EventBus } from './eventBus'

export enum WSEvent {
  connect = 'connect',
  error = 'error',
  message = 'message',
  close = 'close',
}

export class WSTransport extends EventBus {
  private socket: WebSocket | null = null

  constructor(private url: string) {
    super()
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url)

    this.subscribe(this.socket)
    this.setupPing()

    return new Promise((resolve) => {
      this.on(WSEvent.connect, () => {
        resolve()
      })
    })
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connect')
    }

    this.socket.send(JSON.stringify(data))
  }

  public close() {
    if (!this.socket) {
      throw new Error('Scoket is not connected')
    }

    this.socket.close()
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSEvent.connect)
    })

    socket.addEventListener('error', (e) => {
      this.emit(WSEvent.error, e)
    })

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data)

        if ((data.type && data.type === 'pong') || (data.type && data.type === 'user connected')) {
          return
        }

        this.emit(WSEvent.message, data)
      } catch (e) {
        console.error(e)
      }
    })

    socket.addEventListener('close', () => {
      this.emit(WSEvent.close)
    })
  }

  private setupPing(interval = 5000) {
    setInterval(() => {
      this.send({ type: 'ping' })
    }, interval)
  }
}
