import React from 'react'
import "./LoginSignup.css";
function Signup() {
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
        &mdash; Admin Registration<br/>
        <span style={{fontSize:12}} className='fw-bold'>Please note that only one admin account can be create</span>
        <div className="w-full ps-4 pe-4 text-start">
          <form className="w-full">
          <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              
              <input
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary mb-4">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup