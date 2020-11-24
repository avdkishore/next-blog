import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducer';
import rootSaga from './saga';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

// const makeConfiguredStore = (reducer) => {
//   const sagaMiddleware = createSagaMiddleware();

//   const store = createStore(reducer, bindMiddleware([sagaMiddleware]));
//   store.sagaTask = sagaMiddleware.run(rootSaga);

//   return store;
// };

// export const makeStore = () => {
//   const isServer = typeof window === 'undefined';
  
//   if (isServer) {
//     return makeConfiguredStore(rootReducer);
//   } else {
//     // we need it only on client side
//     const {persistStore, persistReducer} = require('redux-persist');
//     const storage = require('redux-persist/lib/storage').default;

//     const persistConfig = {
//       key: 'nextjs',
//       whitelist: ['fromClient'], // make sure it does not clash with server keys
//       storage
//     };

//     const persistedReducer = persistReducer(persistConfig, rootReducer);
//     const store = makeConfiguredStore(persistedReducer);

//     store.__persistor = persistStore(store); // Nasty hack
//     return store;
//   }
// };

export const wrapper = createWrapper(makeStore, { debug: true });
