const initialState = {
  teams: [],
  team:null,
  error: null,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TEAM_SUCCESS":
      return {
        ...state,
        teams: [...state.teams, action.payload.data],
        error: null,
      };
    case "CREATE_TEAM_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_TEAMS_SUCCESS":
      return {
        ...state,
        teams: action.payload.data,
        error: null,
      };
    case "FETCH_TEAMS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_TEAM_SUCCESS":
      return {
        ...state,
        team: action.payload.data,
        error: null,
      };
    case "FETCH_TEAM_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default teamReducer;
