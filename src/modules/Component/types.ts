import Component from './'

export interface DefaultProps {
  events?: {
    [key in keyof HTMLElementEventMap]?: EventListenerOrEventListenerObject
  }
}

export type Children = Record<string, Component | Component[]>
