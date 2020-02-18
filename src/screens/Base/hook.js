/**
 * Author: Mr. Cheng Sokdara
 * Repository: https://github.com/chengsokdara/camdebate-app
 *
 * Email: chengsokdara@gmail.com
 * Phone: 086558716
 * Website: https://rawewhat-team.web.app
 * License: MIT
 *
 * Created At: 03/02/2020
 */
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
