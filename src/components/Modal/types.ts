import Component from "../../utils/Component"
import { IEvents } from "../../types"

export interface IModal {
    children?: {
        body: Component
    },
    events?: IEvents
}
