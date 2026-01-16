import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  useCaseLogin,
  type LoginCredentials,
} from "../../../features/auth/use-cases/login";
import { fetcher } from "../../instances/axios.intance";
import { useCaseVerifyToken } from "../../../features/auth/use-cases/verifyToken";
import { whoAmIUseCase } from "../../../features/auth/use-cases/whoAmI";

const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await useCaseLogin(fetcher, credentials);
      return response;
    } catch (error: unknown) {
    return fetcher.errorMapper.isMappedError(error)
      ? rejectWithValue(error)
      : rejectWithValue(fetcher.errorMapper.fromUnknownError(error,'LOGIN_API'))
    }
  }
);

const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await useCaseVerifyToken(fetcher);
      console.log('verifyToken',response)
      return response;
    } catch (error: unknown) {
      return fetcher.errorMapper.isMappedError(error)
      ? rejectWithValue(error)
      : rejectWithValue(fetcher.errorMapper.fromUnknownError(error,'VERIFY_TOKEN_API'))
    }
  }
);

const revalidateTokenSilently = createAsyncThunk(
  "auth/revalidateTokenSilently",
  async (_, { rejectWithValue }) => {
    try {
      const response = await useCaseVerifyToken(fetcher);
      return response;
    } catch (error: unknown) {
      return fetcher.errorMapper.isMappedError(error)
      ? rejectWithValue(error)
      : rejectWithValue(fetcher.errorMapper.fromUnknownError(error,'VERIFY_TOKEN_API'))
    }
  }
)

const whoAmI = createAsyncThunk(
  "auth/whoAmI",
  async (_, { rejectWithValue }) => {
    try {
      const response = await whoAmIUseCase(fetcher);
      return response;
    } catch (error: unknown) {
      return fetcher.errorMapper.isMappedError(error)
      ? rejectWithValue(error)
      : rejectWithValue(fetcher.errorMapper.fromUnknownError(error,'WHO_AM_I_API'))
    }
  }
)

const authActions = {
  login,
  verifyToken,
  revalidateTokenSilently,
  whoAmI
};

export default authActions;
