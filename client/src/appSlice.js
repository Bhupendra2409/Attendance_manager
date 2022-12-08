import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Config from './Config'

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    view: "request",
    user: null,
    requests: [],
    isPresentToday:false,
  },
  reducers: {

    setView: (state, action) => {
      //   console.log(state.view)
      state.view = action.payload
    },
    setUser: (state, action) => {
      //   console.log(state.view)
      state.user = action.payload
    },
    setRequest: (state, action) => {
      //   console.log(state.view)
      state.requests = action.payload
    },
    setToday: (state, action) => {
      //   console.log(state.view)
      state.isPresentToday = action.payload
    },
   


  },
})

// Action creators are generated for each case reducer function 
export const { setUser, setRequest,setToday, setView } = appSlice.actions

export default appSlice.reducer