import {createSlice} from '@reduxjs/toolkit';

export const draftSlice = createSlice({
  name: 'drafts',
  initialState: {
    draftList: [],
    
  },
  reducers: {
    setDrafts: (state, action) => {
      state.draftList = action.payload;
    },
    
  },
});
export const {setDrafts} = draftSlice.actions;
export default draftSlice.reducer;
