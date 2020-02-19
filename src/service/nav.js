import { createRef } from 'react'

export const navRef = createRef()

export const navigate = (name, params) => {
  navRef.current?.navigate(name, params)
}
