import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'

import rootReducer from '../reducers/index'
import rootSaga from '../sagas/index'

const bindMiddleware = (middleware: any) => {
  // if (process.env.NODE_ENV !== 'production') {
  //   const { composeWithDevTools } = require('redux-devtools-extension')
  //   return composeWithDevTools(applyMiddleware(...middleware))
  // }
  return applyMiddleware(...middleware)
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store: any = createStore(rootReducer, bindMiddleware([sagaMiddleware]))
  store.sagaTask = sagaMiddleware.run(rootSaga)
  store.__persistor = persistStore(store)
  return store
}
