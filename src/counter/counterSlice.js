import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    pageSize: 20,
    currentPage: 0,
    totalPages: 1,
    totalResults:0,
  };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  //reducers.. es un OBJETO que contiene ACTIONS
  // pero las ACTIONS no corren solas, toca con DISPATCH
  reducers: {
    setTotalResults: (state,action) => {
      state.totalResults = action.payload;
      state.totalPages=state.totalResults>0?Math.ceil(state.totalResults/state.pageSize):1;
    },
    //state es el initialState de arribita
    increment: (state) => {
      if(state.currentPage<state.totalPages-1)
      state.currentPage += 1;
    },
    decrement: (state) => {
      if(state.currentPage>0)
         state.currentPage -= 1;
    },
    //action .. trae por defecto un payload q es el nuevo valor de.. algo del estado
    incrementByAmount: (state, action) => {
      state.currentPage += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTotalResults, increment, decrement, incrementByAmount } = counterSlice.actions;

//-- al parecer este .reducer NO ES el reducers de arriba.. es .. es.. no se que es..
//-- es una función reducer que maneja el estado del slice creado con createSlice
export default counterSlice.reducer;