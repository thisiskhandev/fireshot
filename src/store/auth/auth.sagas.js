import { takeLatest, call, put, all, delay } from "redux-saga/effects";

import axios, { setAuthToken } from "src/config/axios.config";

import * as actions from "./auth.actions";
import * as AuthType from "./auth.types";

import { toast } from "react-toastify";

export function* loadUserAsync() {
  console.log("token>>>", localStorage.token);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = yield axios.get("/api/auth/me");

    toast.success(res.data.successMessage);
    yield put(actions.loadUserSuccess(res.data));
  } catch (err) {
    console.error(err);
    yield put(actions.loadUserFail(err));
  }
}

export function* onSigninAsync({ payload: { formData, callback } }) {
  try {
    const res = yield axios.post("/api/auth/login", formData);

    localStorage.setItem("token", res.data.token);
    yield put(actions.signinSuccess(res.data));
    toast.success(res.data.successMessage);

    if (callback) {
      yield call(callback);
    }

    yield put(actions.loadUserStart());
  } catch (err) {
    console.error(err);
    yield put(actions.signinFail(err));
  }
}

export function* onSignupAsync({ payload: { formData, callback } }) {
  try {
    const res = yield axios.post("/api/auth/register", formData);
    if (res.status === 200) {
      toast.success(res.data.successMessage);
      yield put(actions.signupSuccess(res.data));

      if (callback) {
        yield call(callback);
      }
    } else if (res.status === 201) {
      toast.error(res.data.errorMessage);
    } else if (res.status === 201) {
      // setPasswordMessage(res.data.errorMessage);
    } else {
      toast.error(res.data.errorMessage);
    }
  } catch (err) {
    yield put(actions.signupFail(err.message));
  }
}

export function* signOutAsync({ payload: { callback } }) {
  try {
    yield axios.get("/api/auth/logout");
    yield put(actions.signoutSuccess());
    toast.success("You have been logged out successfully");
    if (callback) {
      yield call(callback);
    }
  } catch (err) {
    console.error(err);
    yield put(actions.signoutFail(err));
  }
}

export function* watchLoadUser() {
  yield takeLatest(AuthType.LOAD_USER_START, loadUserAsync);
}

export function* watchSignin() {
  yield takeLatest(AuthType.SIGN_IN_START, onSigninAsync);
}

export function* watchSignup() {
  yield takeLatest(AuthType.SIGN_UP_START, onSignupAsync);
}

export function* watchSignout() {
  yield takeLatest(AuthType.SIGN_OUT_START, signOutAsync);
}

export function* authSagas() {
  yield all([
    call(watchSignin),
    call(watchSignup),
    call(watchSignout),
    call(watchLoadUser),
  ]);
}
