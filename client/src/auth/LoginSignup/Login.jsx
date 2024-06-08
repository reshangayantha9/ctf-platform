import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Actions/authActions'; // Import login action
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./LoginSignup.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.user) {
      navigate('/');
      toast.success('Login successful!');
    }
    if (auth?.error) {
      toast.error(auth.error); 
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login( email, password ));
    
  };

  return (
    <div className="container">
      <div class="heading">
        <h1>
          HACK HUNTER
          <span>The Cyber Battle Arena</span>
        </h1>
      </div>
      <div className="login">
        <div class="sub_hw">
          &mdash; Login
          <div className="w-full ps-4 pe-4 text-start">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-4">
                Login
              </button>
            </form>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
