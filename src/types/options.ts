export type BaseOption = {
  name: string
  password: string
  content: string
}

export type Validation = BaseOption

export type Option = BaseOption & {
  id: number
  content?: string
}

export type Options = Option[]
