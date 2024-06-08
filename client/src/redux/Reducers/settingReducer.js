const initialState = {
  settings: null,
  error: null,
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SETTINGS_SUCCESS':
      return {
        ...state,
        settings: action.payload,
        error: null,
      };
    case 'CREATE_SETTINGS_ERROR':
      return {
        ...state,
        settings: null,
        error: action.payload,
      };
    case 'FETCH_SETTINGS_SUCCESS':
      return {
        ...state,
        settings: action.payload,
        error: null,
      };
    case 'FETCH_SETTINGS_ERROR':
      return {
        ...state,
        settings: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default settingReducer;
