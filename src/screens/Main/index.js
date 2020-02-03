import React from 'react'
import useMainHook from './hook'

const MainScreen = () => {
  const [{ mainState }, { dispatch }] = useMainHook()
  console.log('MainScreen', mainState)
  return <></>
}

export default MainScreen
