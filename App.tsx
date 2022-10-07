import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import RouterApp from './services/routers'
import { makeStore } from './services/store/index'
import { Provider, useDispatch } from 'react-redux'
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import Colors from './constants/Colors'
import { useEffect } from 'react'
import { getProfile } from './services/actions/profile'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    secondary: Colors.light.secondary,
  },
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  // const Dispatch = useDispatch()

  const store = makeStore()

  useEffect(() => {
    // Dispatch(getProfile())
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          {/* <LoginScreen /> */}
          <PaperProvider theme={theme}>
            <RouterApp />
            {/* <Navigation colorScheme={colorScheme} /> */}
            <StatusBar />
          </PaperProvider>
        </SafeAreaProvider>
      </Provider>
    )
  }
}
