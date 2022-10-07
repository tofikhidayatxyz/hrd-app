import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NotFoundScreen from '../../screens/NotFoundScreen'
import Authenticate from './Authenticate'
import routers from './routes'
const Stack = createNativeStackNavigator()
import { navigationRef } from './root-navigation'

export default function () {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {routers
          .filter((a) => a.type !== 'modal')
          .map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
              options={route.options}
            />
          ))}

        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          {routers
            .filter((a) => a.type === 'modal')
            .map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
                options={route.options}
              />
            ))}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
