export interface ILabel {
  name: string,
  type?: string,
  label?: string,
  value?: string,
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
  regex?: string,
  error_text?: string
  isProfile?: boolean
}
