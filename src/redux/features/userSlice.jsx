import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, name, email , age,address ,aadharCardNumber,mobile  } = action.payload;
      state.id = id;
      state.name = name;
      state.age = age;
      state.email = email;
      state.mobile = mobile;
      state.address = address;
      state.aadharCardNumber = aadharCardNumber;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.id = '';
      state.name = '';
      state.age = '';
      state.email = '';
      state.mobile = '';
      state.address = '';
      state.aadharCardNumber = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
