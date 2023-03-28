import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    url: '',
  },
  reducers: {
    setAudioUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { setAudioUrl } = audioSlice.actions;
export default audioSlice.reducer;
