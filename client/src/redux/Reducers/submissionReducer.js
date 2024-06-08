const initialState = {
    submissions: [],
    error: null,
  };
  
  const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_SUBMISSION_SUCCESS':
        return {
          ...state,
          submissions: [...state.submissions, action.payload.data],
          error: null
        };
      case 'CREATE_SUBMISSION_ERROR':
        return {
          ...state,
          error: action.payload
        };
      case 'FETCH_SUBMISSIONS_SUCCESS':
        return {
          ...state,
          submissions: action.payload.data,
          error: null
        };
      case 'FETCH_SUBMISSIONS_ERROR':
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default submissionReducer;
  