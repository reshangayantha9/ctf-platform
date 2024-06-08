import React, { useEffect, useState } from "react";
import "./Challenges.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deletechallenge, fetchChallenges, editChallenge } from "../../../redux/Actions/challengeActions";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Challenges({ onEditChallenge }) {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [challengeId, setChallengeId] = useState("");
  const [hint, setHint] = useState({ title: "", cost: "" });
  const dispatch = useDispatch();
  const { challenges, error } = useSelector((state) => state.challenge);

  useEffect(() => {
    dispatch(fetchChallenges());
  }, [dispatch]);

  const handleDeleteChallenge = (id) => {
    dispatch(deletechallenge(id))
      .then(() => {
        toast.success("Challenge Deleted Successfully");
        dispatch(fetchChallenges());
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleOpen = (id) => {
    setChallengeId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHint((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (challengeId) {
      const challenge = challenges.find((ch) => ch._id === challengeId);
      const updatedHints = [...challenge.hints, hint];
      const updatedChallenge = { ...challenge, hints: updatedHints };

      dispatch(editChallenge(challengeId, updatedChallenge))
        .then(() => {
          toast.success("Hint added successfully");
          setHint({ title: "", cost: "" });
          handleClose();
          dispatch(fetchChallenges());
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "category", headerName: "Category" },
    { field: "value", headerName: "Value" },
    { field: "state", headerName: "State" },
    {
      field: "hints",
      headerName: "Add new hint",
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center p-2">
          <button
            className="btn btn-info p-1"
            style={{ padding: 0, width: 100 }}
            onClick={() => handleOpen(params.row._id)}
          >
            <i className="bi bi-bell-fill" style={{ fontSize: 16 }}></i>
          </button>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2 pt-2">
          <button
            className="btn btn-success p-1"
            style={{ padding: 0 }}
            onClick={() => {
              setChallengeId(params.row._id);
              setIsEdit(true);
              onEditChallenge(params.row._id);
            }}
          >
            <i className="bi bi-pencil" style={{ fontSize: 16 }}></i>
          </button>
          <button
            className="btn btn-danger p-1"
            style={{ padding: 0 }}
            onClick={() => handleDeleteChallenge(params.row._id)}
          >
            <i className="bi bi-trash" style={{ fontSize: 16 }}></i>
          </button>
        </div>
      ),
    },
  ];

  const rows =
    challenges?.map((challenge, index) => ({
      _id: challenge._id,
      id: index + 1,
      name: challenge.name,
      category: challenge.category,
      value: challenge.value,
      state: challenge.state,
    })) || [];

  return (
    <div className="container mt-5">
      <div className="user-body">
        <div className="all-users-container table-responsive w-100">
          <div style={{ height: "auto", width: "100%" }}>
            {challenges?.length === 0 ? (
              <div>No challenges available</div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                autoHeight
              />
            )}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new hint
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                  value={hint.title}
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
                  value={hint.cost}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-0">
                <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Add new Hint
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Challenges;
