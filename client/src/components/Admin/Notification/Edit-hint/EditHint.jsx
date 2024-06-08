import React from 'react';
import { useDispatch } from 'react-redux';
import { editChallenge, fetchChallenges } from '../../../../redux/Actions/challengeActions';
import toast from 'react-hot-toast';

function EditHint({ hintData, setHintData, challengeId, hintIndex }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHintData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editChallenge(challengeId, { [`hints.${hintIndex}`]: hintData }))
      .then(() => {
        dispatch(fetchChallenges());
        setHintData({ title: '', cost: '' })
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="container-fluid">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="title" className="form-label">
            Hint
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={hintData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="cost" className="form-label">
            Cost
          </label>
          <input
            type="number"
            className="form-control"
            id="cost"
            name="cost"
            value={hintData.cost}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-0">
          <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Edit Hint
        </button>
      </form>
    </div>
  );
}

export default EditHint;
