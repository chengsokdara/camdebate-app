import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { loginAsync } from '../../service'

const useLoading = navigation => {
  const dispatch = useDispatch()

  const _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log('_bootstrapAsync token', token)
    if (token) await dispatch(loginAsync(token))
    navigation.navigate(token ? 'App' : 'Auth')
  }

  useEffect(() => {
    console.log('Loading rendered.')
    const timeoutId = setTimeout(_bootstrapAsync, 0)
    return () => clearTimeout(timeoutId)
  }, [])

  return null
}

export default useLoading
