import { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
//import { AsyncStorage } from 'react-native'

const useLoadingHook = navigation => {
  const { token } = useSelector(state => state.auth, shallowEqual)

  const _bootstrapAsync = async () => {
    //const token = await AsyncStorage.getItem('token')
    navigation.navigate(token ? 'App' : 'Auth')
  }

  useEffect(() => {
    console.log('Loading rendered.')
    const timeoutId = setTimeout(_bootstrapAsync, 3000)
    return () => clearTimeout(timeoutId)
  }, [])

  return null
}

export default useLoadingHook
