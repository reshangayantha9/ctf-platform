const initialState = {
  users: [],
  adminUsers: [],
  userByName: null,
  error: null,
  userById: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        error: null,
      };
    case "CREATE_USER_ERROR":
      return {
        error: action.payload,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case "FETCH_USERS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_ADMIN_USERS_SUCCESS":
      return {
        ...state,
        adminUsers: action.payload,
        error: null,
      };
    case "FETCH_ADMIN_USERS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_USER_BY_NAME_SUCCESS":
      return {
        ...state,
        userByName: action.payload,
        error: null,
      };
    case "FETCH_USER_BY_NAME_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_USER_BY_ID_SUCCESS":
      return {
        ...state,
        userById: action.payload,
        error: null,
      };
    case "FETCH_USER_BY_ID_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "  EDIT_USER_SUCCESS":
      return {
        ...state,
        userById: null,
        error: null,
      };
    case "EDIT_USER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "  DELETE_USER_SUCCESS":
      return {
        ...state,
        userById: null,
        error: null,
      };
    case "DELETE_USER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
