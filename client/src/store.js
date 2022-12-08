import { configureStore } from '@reduxjs/toolkit'
import appSilceReducer from './appSlice'

export default configureStore({
  reducer: {
    appSlice: appSilceReducer,
  },
})