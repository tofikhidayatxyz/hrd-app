import { StyleSheet, Dimensions } from 'react-native'
import color from '../constants/Colors'

const scheme = color.light

export default StyleSheet.create<any>({
  wrapper: {
    backgroundColor: scheme.secondary,
    // innerHeight: '100%',
    // flex: 1,
  },
  hero: {
    minHeight: 100,
    backgroundColor: scheme.primary,
    padding: 15,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    color: scheme.white,
  },
})
