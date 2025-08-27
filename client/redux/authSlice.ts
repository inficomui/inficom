import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './apis/authApi';

type User = { _id: string; email: string; name: string };
type AuthResponse = { user: User; token?: string };

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: getStoredToken(),
  user: getStoredUser(),
  isAuthenticated: !!getStoredUser() || !!getStoredToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { user, token } = payload;

        state.user = payload.user
        state.isAuthenticated = true;
        if (token) state.token = token;

        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user));
          if (token) localStorage.setItem('token', token);
        }
      }
    );

    // (optional) handle logout endpoint
    // builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
    //   state.user = null;
    //   state.token = null;
    //   state.isAuthenticated = false;
    //   if (typeof window !== 'undefined') {
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('token');
    //   }
    // });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
