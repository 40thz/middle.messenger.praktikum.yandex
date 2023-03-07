import Button from "./Button"
import { IEvents } from "../../types"

export interface IDropdown {
    icon: string
    children: {
        buttons: Button[]
    }
    events?: IEvents
}
