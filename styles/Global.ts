import { StyleSheet } from 'react-native'

const container = StyleSheet.create<any>({
  flex: 0,
  justifyContent: 'center',
  marginHorizontal: 15,
})

const centeredVertical = StyleSheet.create<any>({
  verticalAlign: 'center',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
})

export default { container, centeredVertical }
