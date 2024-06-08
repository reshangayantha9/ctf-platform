import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChallenge } from "../../../../redux/Actions/challengeActions";
import toast from 'react-hot-toast';

function AddChallenge() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [resource, setResource] = useState("");
  const [flag, setFlag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const challengeData = {
      name,
      category,
      value,
      state,
      description,
      resource,
      flag,
    };

    dispatch(createChallenge(challengeData))
      .then((payload) => {
        setName("");
        setCategory("");
        setValue("");
        setState("");
        setDescription("");
        setResource("");
        setFlag("");
        toast.success("New challenge created successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="sub_hw">&mdash;Add new challenge</div>
      <div className="user-container">
        <div className="w-full ps-4 pe-4 text-start">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="value" className="form-label">
                Value
              </label>
              <input
                type="number"
                className="form-control"
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select state</option>
                <option value="visible">Visible</option>
                <option value="disable">Disable</option>
              </select>
            </div>
            <div className="mb-3 mt-3">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Write a description here"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: "100px" }}
                ></textarea>
                <label htmlFor="description" style={{ color: 'var(--background-color)' }}>
                  Description
                </label>
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="resource" className="form-label">
                Resource
              </label>
              <input
                type="text"
                className="form-control"
                id="resource"
                value={resource}
                onChange={(e) => setResource(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="flag" className="form-label">
                Flag
              </label>
              <input
                type="text"
                className="form-control"
                id="flag"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-0">
              <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Add new challenge
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddChallenge;
