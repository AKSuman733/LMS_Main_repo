import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../services/authService";

/* ================= LOGIN ================= */

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* ================= REGISTER ================= */

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* ================= PROFILE ================= */

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      return await getProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* ================= INITIAL STATE ================= */

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,

  isLoading: false,
  isSuccess: false,
  isError: false,

  message: "",
};

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
    },

    resetAuthState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      /* LOGIN */
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "token",
          action.payload.token
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload?.message;
      })

      /* REGISTER */
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.user = action.payload.user;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload?.message;
      })

      /* PROFILE */
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload?.message;
      });
  },
});

export const {
  logout,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;