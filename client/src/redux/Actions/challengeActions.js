import axios from 'axios';

export const createChallenge = (challengeData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-challenge`, challengeData,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'CREATE_CHALLENGE_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'CREATE_CHALLENGE_ERROR', payload: error.response.data.message });
    }
  };
};

export const fetchChallenges = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-challenge`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_CHALLENGES_SUCCESS', payload: response?.data });
    } catch (error) {
      dispatch({ type: 'FETCH_CHALLENGES_ERROR', payload: error.response.data.message });
    }
  };
};

export const editChallenge = (id,challengeData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/add-hint/${id}`, challengeData , {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'EDIT_CHALLENGES_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'EDIT_CHALLENGES_ERROR', payload: errorMessage });
      throw error;
    }
  };
};

export const deletechallenge = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-challenge/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'DELETE_CHALLENGES_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'DELETE_CHALLENGES_ERROR', payload: errorMessage });
      throw error;
    }
  };
};

export const fetchChallengeById = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-challenge/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_CHALLENGE_SUCCESS', payload: response?.data });
    } catch (error) {
      dispatch({ type: 'FETCH_CHALLENGE_ERROR', payload: error.response.data.message });
    }
  };
};
export const fetchUserChallenges = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-user-challenge`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      console.log('Fetch response:', response.data); // Log the response
      dispatch({ type: 'FETCH_USER_CHALLENGES_SUCCESS', payload: response.data });
    } catch (error) {
      console.log('Fetch error:', error.response.data.message); // Log any error
      dispatch({ type: 'FETCH_USER_CHALLENGES_ERROR', payload: error.response.data.message });
    }
  };
};

export const usedHint = (hintData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/use-hint`,hintData,{headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
    } catch (error) {
      console.log('Fetch error:', error.response.data.message); 
    }
  };
};
