import axios from "axios";

export const initializeAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const user=localStorage.getItem("user");
    if (token && user ) {
      dispatch({ type: "LOGIN_SUCCESS", payload: {token:token,user:user}  });
    }
  };
};

export const signUp = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        userData
      );
      dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
      dispatch({ type: "SIGNUP_ERROR", payload: errorMessage });
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        { email, password }
      );
      const data = response.data;
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user",JSON.stringify(data.data))
        dispatch({ type: "LOGIN_SUCCESS", payload: {token:data.token,user:data.data} });
      } else {
        throw new Error("Token not found in response data");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred";
      dispatch({ type: "LOGIN_ERROR", payload: errorMessage });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT_SUCCESS" });
  };
};
