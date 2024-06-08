const initialState = {
  challenges: [],
  userChallenge: [],
  challenge: null,
  error: null,
};

const challengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CHALLENGE_SUCCESS":
      return {
        ...state,
        challenges: [...state.challenges, action.payload.data],
        error: null,
      };
    case "CREATE_CHALLENGE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_CHALLENGES_SUCCESS":
      return {
        ...state,
        challenges: action.payload.data,
        error: null,
      };
    case "FETCH_CHALLENGES_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_CHALLENGE_SUCCESS":
      return {
        ...state,
        challenge: action.payload.data,
        error: null,
      };
    case "FETCH_CHALLENGE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_USER_CHALLENGES_SUCCESS":
      console.log('Reducer payload:', action.payload); // Log the payload
      return {
        ...state,
        userChallenge: action.payload,
        error: null,
      };
    case "FETCH_USER_CHALLENGES_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "EDIT_CHALLENGES_SUCCESS":
      return {
        ...state,
        error: null,
      };
    case "EDIT_CHALLENGES_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_CHALLENGES_SUCCESS":
      return {
        ...state,
        error: null,
      };
    case "DELETE_CHALLENGES_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default challengeReducer;
