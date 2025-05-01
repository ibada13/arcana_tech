import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await axios.post('/auth/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: { username: string; email: string; password: string }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const response = await axios.post('/auth/register', { username, email, password }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      } 
    });


    return response.data;
  }
);

export const checkUser = createAsyncThunk('auth/checkUser', async () => {
  const token = getTokenFromLocalStorage();
  if (token) {
    try {
      await axios.get('/auth/check', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
});

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const token = getTokenFromLocalStorage();
  if (token) {
    const response = await axios.get('/auth/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: null,
    loading: false,
  },
  reducers: {
    logout(state) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isAuth = action.payload;
      })
      .addCase(checkUser.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
