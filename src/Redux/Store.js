import { configureStore } from '@reduxjs/toolkit'
import myreducer from './Reducers'

export const store = configureStore({
  reducer: myreducer,
})
