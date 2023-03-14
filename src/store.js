import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';

export const store = configureStore({
  reducer: {
    //--counterReducer es lo que default exporta: counterSlice.reducer;
    counter: counterReducer,
  },
}); 