import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { fetchChallenges, editChallenge } from '../../../redux/Actions/challengeActions';
import EditHint from './Edit-hint/EditHint';
import toast from 'react-hot-toast';

function Notification() {
  const [selectedHint, setSelectedHint] = useState(null);
  const [hintData, setHintData] = useState({ title: '', cost: '' });
  const dispatch = useDispatch();
  const { challenges } = useSelector((state) => state.challenge);

  useEffect(() => {
    dispatch(fetchChallenges());
  }, [dispatch]);

  const handleEditHint = (hint, challengeId) => {
    setSelectedHint({ hint, challengeId });
    setHintData(hint);
  };

  const handleDeleteHint = (challengeId, hintIndex) => {
    const challenge = challenges.find((ch) => ch._id === challengeId);
    const updatedHints = challenge.hints.filter((_, index) => index !== hintIndex);
    const updatedChallenge = { ...challenge, hints: updatedHints };

    dispatch(editChallenge(challengeId, updatedChallenge))
      .then(() => {
        toast.success('Hint deleted successfully');
        dispatch(fetchChallenges());
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const columns = [
    { field: 'challengeName', headerName: 'Challenge Name', width: 200 },
    { field: 'title', headerName: 'Hint', width: 200 },
    { field: 'cost', headerName: 'Cost', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2 pt-2">
          <button
            className="btn btn-success p-1"
            style={{ padding: 0 }}
            onClick={() => handleEditHint(params.row, params.row.challengeId)}
          >
            <i className="bi bi-pencil" style={{ fontSize: 16 }}></i>
          </button>
          <button
            className="btn btn-danger p-1"
            style={{ padding: 0 }}
            onClick={() => handleDeleteHint(params.row.challengeId, params.row.index)}
          >
            <i className="bi bi-trash" style={{ fontSize: 16 }}></i>
          </button>
        </div>
      ),
    },
  ];

  const rows = challenges
    ? challenges.flatMap((challenge, challengeIndex) =>
        challenge.hints.map((hint, hintIndex) => ({
          id: `${challengeIndex}-${hintIndex}`,
          challengeId: challenge._id,
          challengeName: challenge.name,
          title: hint.title,
          cost: hint.cost,
          index: hintIndex,
        }))
      )
    : [];

  return (
    <div className="container-fluid mt-5">
      <div className="sub_hw">&mdash;All Hints</div>
      <div className="user-header">
        <div className="d-flex gap-3 align-items-center">
          <input type="text" className="form-control" id="search" placeholder="Search..." />
          <button type="submit" className="btn btn-primary mt-0">
            <i className="bi bi-search"></i>&nbsp;&nbsp;Search
          </button>
        </div>
      </div>
      <div className="user-body">
        <div className="">
          <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10]} autoHeight />
          </div>
        </div>
        <div className="user-container">
          {selectedHint ? (
            <EditHint
              hintData={hintData}
              setHintData={setHintData}
              challengeId={selectedHint.challengeId}
              hintIndex={selectedHint.hint.index}
            />
          ):<></>}
        </div>
      </div>
    </div>
  );
}

export default Notification;
