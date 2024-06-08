const initialState = {
    user: null,
    error: null,
    token:null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          token:action.payload.token,
          error: null
        };
      case 'SIGNUP_ERROR':
      case 'LOGIN_ERROR':
        return {
          ...state,
          error: action.payload
        };
        case 'LOGOUT_SUCCESS':
        return {
          ...state,
          user: null,
          token:null,
          error:null
        };
      case 'LOGOUT_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  