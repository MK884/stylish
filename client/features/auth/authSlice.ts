import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthSlice = {
  isAuth: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.isAuth = true;
      state.user = action?.payload;
    },
    changeAvatar: (state, action: PayloadAction<string>) => {
      if(state?.user){
        state.user.avatarUrl = action?.payload
      }
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    setToken: (state, action: PayloadAction<Token>) => {
      const { accessToken, refreshToken } = action?.payload;
      if (state.user)
        state.user = {
          ...state.user,
          accessToken,
          refreshToken,
        };
    },
  },
});

export const isLoggedIn = (state: RootState) => state.auth.isAuth;
export const useUser = (state: RootState) => state.auth.user;

export const { setUser, logout, setToken, changeAvatar } = authSlice.actions;
export default authSlice.reducer;
