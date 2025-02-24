import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    appLoading: true,
  },
  reducers: {
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
    },
  },
});
export const {setAppLoading} = appSlice.actions;
export default appSlice.reducer;
