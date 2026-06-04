import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCourses,
  getCourseById,
  getMyCourses,
} from "../services/courseService";

/* ================= GET COURSES ================= */

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getCourses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* ================= GET COURSE DETAILS ================= */

export const fetchCourseDetails = createAsyncThunk(
  "courses/fetchById",
  async (id, thunkAPI) => {
    try {
      return await getCourseById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* ================= GET MY COURSES ================= */

export const fetchMyCourses = createAsyncThunk(
  "courses/fetchMyCourses",
  async (_, thunkAPI) => {
    try {
      return await getMyCourses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* ================= INITIAL STATE ================= */

const initialState = {
  courses: [],
  course: null,
  myCourses: [],

  isLoading: false,
  isSuccess: false,
  isError: false,

  message: "",
};

/* ================= SLICE ================= */

const courseSlice = createSlice({
  name: "courses",
  initialState,

  reducers: {
    resetCourseState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      /* GET COURSES */
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.courses = action.payload;
      })

      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload?.message;
      })

      /* GET COURSE DETAILS */
      .addCase(fetchCourseDetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.course = action.payload;
      })

      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload?.message;
      })

      /* GET MY COURSES */
      .addCase(fetchMyCourses.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.isLoading = false;

        state.myCourses = action.payload;
      })

      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload?.message;
      });
  },
});

export const {
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;