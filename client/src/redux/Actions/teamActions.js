import axios from 'axios';

export const createTeam = (teamData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-team`, teamData,{
        headers: {
          Authorization: `Bearer ${token}` 
        },
        withCredentials: true
      });
      dispatch({ type: 'CREATE_TEAM_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'CREATE_TEAM_ERROR', payload: error.response.data.message });
    }
  };
};

export const fetchTeams = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-teams`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_TEAMS_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_TEAMS_ERROR', payload: errorMessage });
      throw error;
    }
  };
};
export const fetchTeamById = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-team/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_TEAM_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_TEAM_ERROR', payload: errorMessage });
      throw error;
    }
  };
};
export const deleteTeam = (teamId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch(fetchTeams());
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_TEAMS_ERROR', payload: errorMessage });
      throw error;
    }
  };
};
