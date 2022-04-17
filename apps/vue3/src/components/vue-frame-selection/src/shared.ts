export const FrameSelectionSymbol = Symbol('FrameSelection instance')

export interface IProvideMethods {
  addField: (item: HTMLElement) => void
  removeField: (item: HTMLElement) => void
}

export interface PositionSizeMap {
  left: number
  top: number
  width: number
  height: number
}
