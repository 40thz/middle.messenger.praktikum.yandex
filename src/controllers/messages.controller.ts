import { WSEvent, WSTransport } from '../modules/WebSocketClient'
import { IMessage } from '../services/chat.service/types'
import store from '../modules/Store'

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map()

  async connect(id: number, token: string) {
    if (this.sockets.get(id)) {
      return
    }

    const { user } = store.getState()

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${user.data.id}/${id}/${token}`
    )

    await transport.connect()

    this.sockets.set(id, transport)

    this.fetchOldMessage(id)

    this.subscribe(transport, id)
  }

  sendMessage(id: number, message: string) {
    const transport = this.sockets.get(id)

    if (!transport) {
      throw new Error(`Chat id=${id} is not connected`)
    }

    transport.send({
      type: 'message',
      content: message,
    })
  }

  fetchOldMessage(id: number) {
    const transport = this.sockets.get(id)

    if (!transport) {
      throw new Error(`Chat id=${id} is not connected`)
    }

    transport.send({
      type: 'get old',
      content: '0',
    })
  }

  public closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close())
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    const storeKey = `messenger.messages.${id}`

    if (Array.isArray(messages)) {
      store.set(storeKey, messages)

      return
    }

    const oldMessages = store.getState().messenger.messages[id]

    if (!oldMessages) {
      store.set(storeKey, [messages])

      return
    }

    store.set(storeKey, [...oldMessages, messages])
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId)
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSEvent.message, (messages) => this.onMessage(id, messages))
    transport.on(WSEvent.close, () => this.onClose(id))
  }
}

export default new MessagesController()
