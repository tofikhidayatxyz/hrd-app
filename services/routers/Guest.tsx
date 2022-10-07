import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProfile } from '../actions/profile'

function Guest({ children, navigation }: any) {
  useEffect(() => {
    AsyncStorage.getItem('--app-auth-token').then((token) => {
      if (token?.length > 4) {
        navigation.navigate('home')
      }
    })
  }, [])

  return <>{children}</>
}

export default Guest
