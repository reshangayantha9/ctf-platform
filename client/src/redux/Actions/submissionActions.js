import axios from 'axios';

export const createSubmission = (teamData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-submission`, teamData,{
        headers: {
          Authorization: `Bearer ${token}` 
        },
        withCredentials: true
      });
      dispatch({ type: 'CREATE_SUBMISSION_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'CREATE_SUBMISSION_ERROR', payload: error.response.data.message });
    }
  };
};

export const fetchSubmissions = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-submission`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_SUBMISSIONS_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_SUBMISSIONS_ERROR', payload: errorMessage });
      throw error;
    }
  };
};

