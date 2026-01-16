import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppError } from "../../../entities/errors/IErrors";
import type { IUserFromApi } from "../../../entities/user/IUser";
import type { UseCaseLoginResult } from "../../../features/auth/use-cases/login";
import authActions from "./authActions";
import { type WhoAmIUseCaseResult } from "../../../features/auth/use-cases/whoAmI";

const { login, verifyToken, revalidateTokenSilently,whoAmI} = authActions;

interface AuthState {
    isAuthenticated: boolean;
    user: IUserFromApi | null;
    loading: boolean;
    error: {
        message: string;
        code: string;
        origin: string;
        timestamp: number;
    };
}

const intialState: AuthState = {
  isAuthenticated: false,
  user:null,
  loading: true,
  error: {
    message: "",
    code: "",
    origin: "",
    timestamp: new Date().getTime(),
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = {
        message: "",
        code: "",
        origin: "",
        timestamp: new Date().getTime(),
      };
    },
    clearError: (state) => {
      state.error = {
        message: "",
        code: "",
        origin: "",
        timestamp: new Date().getTime(),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UseCaseLoginResult>) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.loading = false;
        }
      )
      .addCase(
        login.rejected, 
        (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as unknown as AppError;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        verifyToken.fulfilled,
        (state) => {
          state.loading = false;
          state.isAuthenticated = true;
        }
      )
      .addCase(
        verifyToken.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as unknown as AppError;
          state.isAuthenticated = false;
          state.user = null;
        }
      )
      .addCase(
        verifyToken.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        revalidateTokenSilently.rejected,
        (state,action:PayloadAction<unknown>) => {
          state.isAuthenticated = false;
          state.user = null;
          state.error = action.payload as unknown as AppError;
        }
      )
      .addCase(
        whoAmI.fulfilled,
        (state, action: PayloadAction<WhoAmIUseCaseResult>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      )
  },
});

export const { logout, clearError } = authSlice.actions;

export const authReducer = authSlice.reducer;
