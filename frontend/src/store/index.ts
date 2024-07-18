import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authslice';
import mediaReducer from './slices/mediaslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
