import { EventBus } from '../eventBus'
import { Props } from './types'

import { v4 as uuidv4 } from 'uuid'

// Нельзя создавать экземпляр данного класса
class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  public id = uuidv4()

  protected props: Props

  public children: Record<string, Component>

  private eventBus: () => EventBus

  private _element: HTMLElement | null = null

  private _meta: { tagName: string; props: Props; }

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren: Props = {}) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this._meta = {
      tagName,
      props,
    }

    this.children = children
    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Component.EVENTS.INIT)
  }

  _getChildrenAndProps(childrenAndProps: Props) {
    const props: Props = {}
    const children: Record<string, Component> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> }
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  private _init() {
    this._createResources()

    this.init()

    this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
  }

  protected init() { }

  _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount(): void { }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return true
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  _removeEvents(): void {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName: string) => {
      this._element!.removeEventListener(eventName, events[eventName])
    })
  }

  private _render() {
    const fragment = this.render()
    this._removeEvents()
    this._element!.innerHTML = ''

    this._element!.append(fragment)

    this._addEvents()
  }

  private _replaceStub(fragment: HTMLTemplateElement, child: Component) {
    const stub: HTMLElement | null = fragment.content.querySelector(`[data-id="${child.id}"]`)
    if (!stub) {
      return
    }
    child.getContent()?.append(...Array.from(stub.childNodes))
    stub?.replaceWith(child.getContent())
  }

  protected compile(template: (props: Props) => string, props: Props) {
    const propsAndStubs: Props = { ...props }

    Object.entries(this.children).forEach(([name, child]: [string, Component | Component[]]) => {
      if (Array.isArray(child)) {
        propsAndStubs[name] = child.map((childEl: Component) => `<div data-id="${childEl.id}"></div>`)
      } else {
        propsAndStubs[name] = `<div data-id="${child.id}"></div>`
      }
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement
    fragment.innerHTML = template(propsAndStubs)

    Object.values(this.children).forEach((child: Component | Component[]) => {
      if (Array.isArray(child)) {
        child.forEach((childEl) => {
          this._replaceStub(fragment, childEl)
        })
      } else {
        this._replaceStub(fragment, child)
      }
    })

    return fragment.content
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  getContent() {
    return this.element
  }

  _makePropsProxy(props: Props) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}

export default Component
