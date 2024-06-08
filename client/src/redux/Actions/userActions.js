import axios from 'axios';


export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/create-user`,
        userData, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      dispatch({ type: "CREATE_USER_SUCCESS", payload: response.data.data });
            
    } catch (error) {
     const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: "CREATE_USER_ERROR", payload: errorMessage });
      throw error;
    }
  };
};
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-users`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_USERS_ERROR', payload: errorMessage });
      throw error;
    }
  };
};

export const getAllUserAdmin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-users-admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_ADMIN_USERS_SUCCESS', payload: response.data.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_ADMIN_USERS_ERROR', payload: errorMessage });
      throw error;
    }
  };
};

export const getUserByName = (name) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/get-user-by-name`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_USER_BY_NAME_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_USER_BY_NAME_ERROR', payload: errorMessage });
      throw error;
    }
  };
};
export const getUserByID = (_id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/get-user-by-id`, _id , {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'FETCH_USER_BY_ID_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'FETCH_USER_BY_ID_ERROR', payload: errorMessage });
      throw error;
    }
  };
};
export const editUser = (_id,userData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/update-user/${_id}`, userData , {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'EDIT_USER_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'EDIT_USER_ERROR', payload: errorMessage });
      throw error;
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      dispatch({ type: 'DELETE_USER_SUCCESS', payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: 'DELETE_USER_ERROR', payload: errorMessage });
      throw error;
    }
  };
};