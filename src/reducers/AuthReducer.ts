import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginPayload } from '../models/auth.model';

const initialState: AuthState = {
  email: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout(state) {
        state.email = null;
        state.token = null;
        state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;