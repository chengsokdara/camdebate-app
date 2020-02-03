import { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const useBaseHook = () => {
  const dispatch = useDispatch()
  const baseState = useSelector(state => state.main, shallowEqual)

  useEffect(() => {
    console.log('useBaseHook rendered!', baseState)
  }, [])

  return [{ baseState }, { dispatch }]
}

export default useBaseHook
