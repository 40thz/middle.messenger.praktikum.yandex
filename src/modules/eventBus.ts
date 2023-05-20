export class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {}

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      console.error(`Нет события: ${event}`)
      return
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      console.error(`Нет события: ${event}`)
      return
    }

    this.listeners[event].forEach((listener) => {
      listener(...(args as []))
    })
  }
}
