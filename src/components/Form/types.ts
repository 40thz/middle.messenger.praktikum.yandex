import Component from "../../utils/Component"
import { IEvents } from "../../types"
import Label from "../Label"

export interface IForm {
    className: string
    isProfile?: boolean
    children?: {
        labels: Label[]
        actions: Component[]
        button?: Component
    }
    events?: IEvents
}
