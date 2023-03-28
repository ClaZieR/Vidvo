import { configureStore } from '@reduxjs/toolkit';
import audioReducer from '../components/audioSlice';

const store = configureStore({
  reducer: {
    audio: audioReducer,
  },
});

export default store;
