declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.hbs'
declare module '*.svg'

interface Window {
  goToPage: (value: string) => void;
}
