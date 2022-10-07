import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProfile } from '../actions/profile'

function Authenticate({ children, navigation }: any) {
  try {
    // global.navigation = navigation
  } catch (e) {
    // empty
  }
  const Dispatch = useDispatch()
  useEffect(() => {
    Dispatch(getProfile())
  }, [])
  return <>{children}</>
}

export default Authenticate
