import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChallengeById, editChallenge } from '../../../../redux/Actions/challengeActions';
import toast from 'react-hot-toast';

function EditChallenges({ id, onSuccess }) {
  const [challenge, setChallenge] = useState({
    name: '',
    category: '',
    value: '',
    state: '',
    description: '',
    resource: '',
    flag: '',
  });

  const dispatch = useDispatch();
  const { challenge: fetchedChallenge } = useSelector((state) => state.challenge);

  useEffect(() => {
    if (id) {
      dispatch(fetchChallengeById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (fetchedChallenge) {
      setChallenge(fetchedChallenge);
    }
  }, [fetchedChallenge]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallenge((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editChallenge(id, challenge))
      .then(() => {
        toast.success('Challenge updated successfully');
        onSuccess();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="container-fluid mt-5">
      <div className="sub_hw">&mdash;Edit challenge</div>
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
                name="name"
                value={challenge.name}
                onChange={handleChange}
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
                name="category"
                value={challenge.category}
                onChange={handleChange}
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
                name="value"
                value={challenge.value}
                onChange={handleChange}
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
                name="state"
                value={challenge.state}
                onChange={handleChange}
              >
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
                  name="description"
                  value={challenge.description}
                  onChange={handleChange}
                  style={{ height: '100px' }}
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
                name="resource"
                value={challenge.resource}
                onChange={handleChange}
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
                name="flag"
                value={challenge.flag}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-0">
              <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Edit challenge
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditChallenges;
