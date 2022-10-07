import { StyleSheet, Dimensions } from 'react-native'
import color from '../constants/Colors'

const scheme = color.light

export default StyleSheet.create<any>({
  wrapper: {
    backgroundColor: scheme.secondary,
  },
  pageContent: {
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: scheme.background,
    marginTop: 50,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  logoWrapper: {
    padding: 1,
  },
  logo: {
    height: 50,
    width: 50,
  },
  alertWraper: {
    marginTop: 20,
  },
  alertText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: scheme.dark,
  },
  inputWrapper: {
    marginTop: 30,
  },
  signinUsing: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 30,
  },
  siginUsingDivider: {
    flex: 1,
    width: '100%',
    height: 1,
    backgroundColor: scheme.divider,
  },
  siginUsingText: {
    height: 14,
    fontSize: 12,
    paddingHorizontal: 5,
    minWidth: 100,
    color: scheme.text,
  },
  bottomAction: {
    marginTop: 'auto',
    marginBottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActionLink: {
    textDecorationLine: 'underline',
  },
})
