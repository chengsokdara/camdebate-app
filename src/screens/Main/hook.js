import { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setMain } from '../../service/actions'

const useMainHook = () => {
  const dispatch = useDispatch()
  const mainState = useSelector(state => state.main, shallowEqual)

  useEffect(() => {
    dispatch(setMain({ test: true }))
    console.log('useMainHook rendered!', mainState)
  }, [])

  return [{ mainState }, { dispatch }]
}

export default useMainHook
