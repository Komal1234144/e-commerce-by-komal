import { configureStore , getDefaultMiddleware , combineReducers} from '@reduxjs/toolkit';
import cartReducer from './cartSlice'
import {userReducer } from './UserSlice'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user : userReducer,
  cart : cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

 const store =  configureStore({
  reducer: {
    persistedReducer : persistedReducer,
    
  },
  middleware: getDefaultMiddleware({
    serializableCheck : false
  })
})

 let persistor = persistStore(store)
 export { store, persistor };

