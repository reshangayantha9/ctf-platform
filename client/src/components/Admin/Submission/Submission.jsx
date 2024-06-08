import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions } from "../../../redux/Actions/submissionActions";

function Submission() {
  const dispatch = useDispatch();
  const { submissions, error } = useSelector((state) => state.submission);

  useEffect(() => {
    dispatch(fetchSubmissions()).then(()=>{}).catch(()=>{});
    console.log(submissions)
  }, [dispatch]);

  return (
    <div className="container-fluid mt-5">
      <div className="sub_hw">&mdash;All submissions</div>
      <div className="user-header">
        <div className="d-flex gap-3 align-items-center">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search..."
          />
          <button type="submit" className="btn btn-primary mt-0">
            <i className="bi bi-search"></i>&nbsp;&nbsp;Search
          </button>
        </div>
      </div>
      <div className="user-body">
        <div className="all-users-container table-responsive">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Challenge</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {submissions && submissions.length > 0 ? (
                submissions.map((submission, index) => (
                  <tr key={submission._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{submission?.user?.name}</td>
                    <td>{submission?.team?.name}</td>
                    <td>{submission?.challenge?.name}</td>
                    <td>{new Date(submission?.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}

export default Submission;
