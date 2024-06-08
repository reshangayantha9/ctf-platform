import axios from 'axios';

export const createSetting = (settingData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/settings`, settingData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'CREATE_SETTINGS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'CREATE_SETTINGS_ERROR', payload: error.response.data.message });
    }
  };
};

export const fetchSetting = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/settings`);
      dispatch({ type: 'FETCH_SETTINGS_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_SETTINGS_ERROR', payload: errorMessage });
      throw error;
    }
  };
};
