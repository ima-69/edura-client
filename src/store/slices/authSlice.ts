import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../config/api';
import type { AuthState, RegisterData, LoginData, User, UserRole } from '../../types/user.types';
import { storageManager } from '../../utils/storage';

// Initialize storage on app load
storageManager.initializeAuth();

// Get credentials from storage
const { token, user } = storageManager.getCredentials();

// Initial state
const initialState: AuthState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  isLoading: false,
  error: null,
};

// Async thunks
export const registerStudent = createAsyncThunk<
  { user: User; token: string },
  RegisterData,
  { rejectValue: string }
>(
  'auth/registerStudent',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register/student', data);
      const user = { ...response.data.data, role: 'student' as UserRole };
      return { user, token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const registerTeacher = createAsyncThunk<
  { user: User; token: string },
  RegisterData,
  { rejectValue: string }
>(
  'auth/registerTeacher',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register/teacher', data);
      const user = { ...response.data.data, role: 'teacher' as UserRole };
      return { user, token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const registerAdmin = createAsyncThunk<
  { user: User; token: string },
  RegisterData,
  { rejectValue: string }
>(
  'auth/registerAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register/admin', data);
      const user = { ...response.data.data, role: 'admin' as UserRole };
      return { user, token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk<
  { user: User; token: string; rememberMe: boolean },
  LoginData,
  { rejectValue: string }
>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      const user = { ...response.data.data };
      return { user, token: response.data.token, rememberMe: data.rememberMe || false };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const loginStudent = createAsyncThunk<
  { user: User; token: string },
  LoginData,
  { rejectValue: string }
>(
  'auth/loginStudent',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', data);
      const user = { ...response.data.data, role: 'student' as UserRole };
      return { user, token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const loginTeacher = createAsyncThunk<
  { user: User; token: string },
  LoginData,
  { rejectValue: string }
>(
  'auth/loginTeacher',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login/teacher', data);
      const user = { ...response.data.data, role: 'teacher' as UserRole };
      return { user, token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const loginAdmin = createAsyncThunk<
  { user: User; token: string },
  LoginData,
  { rejectValue: string }
>(
  'auth/loginAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login/admin', data);
      const user = { ...response.data.data, role: 'admin' as UserRole };
      return { user, token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      storageManager.clearAuth();
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string; rememberMe?: boolean }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      storageManager.saveCredentials(
        action.payload.token, 
        action.payload.user, 
        action.payload.rememberMe || false
      );
    },
  },
  extraReducers: (builder) => {
    // Register Student
    builder
      .addCase(registerStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storageManager.saveCredentials(action.payload.token, action.payload.user, true);
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });

    // Register Teacher
    builder
      .addCase(registerTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storageManager.saveCredentials(action.payload.token, action.payload.user, true);
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });

    // Register Admin
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storageManager.saveCredentials(action.payload.token, action.payload.user, true);
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });

    // Universal Login (auto-detect user type)
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storageManager.saveCredentials(
          action.payload.token,
          action.payload.user,
          action.payload.rememberMe
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });

    // Login Student
    builder
      .addCase(loginStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storageManager.saveCredentials(action.payload.token, action.payload.user, true);
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });

    // Login Teacher
    builder
      .addCase(loginTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storageManager.saveCredentials(action.payload.token, action.payload.user, true);
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });

    // Login Admin
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storageManager.saveCredentials(action.payload.token, action.payload.user, true);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;

