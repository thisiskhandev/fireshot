import * as AuthType from './auth.types';

const INITIAL_STATE = {
  isAuthenticated: null,
  currentUser: {},
  newUser: {},
  error: null,
  loading: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthType.SIGN_IN_START:
    case AuthType.SIGN_UP_START:
      return {
        ...state,
        loading: true
      };

    case AuthType.SIGN_IN_SUCCESS:
      console.log('here...', payload);
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case AuthType.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload.data,
        loading: false
      };

    case AuthType.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case AuthType.SIGN_OUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        currentUser: {},
        error: null
      };

    case AuthType.LOAD_USER_FAILURE:
    case AuthType.SIGN_IN_FAILURE:
    case AuthType.SIGN_UP_FAILURE:
    case AuthType.SIGN_OUT_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        error: payload
      };

    case AuthType.CLEAR_ERROR_LOG:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default authReducer;
