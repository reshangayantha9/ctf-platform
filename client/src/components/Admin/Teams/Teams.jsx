import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, fetchTeams,deleteTeam } from "../../../redux/Actions/teamActions";
import { DataGrid } from "@mui/x-data-grid";

function Teams() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.team.teams);
  const error = useSelector((state) => state.team.error);
  const [newTeamName, setNewTeamName] = useState("");
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleCreateTeam = () => {
    dispatch(createTeam({ name: newTeamName }));
    setNewTeamName("");
  };

  const handleDeleteTeam=(teamId)=>{
  
  dispatch(deleteTeam(teamId))
  }
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "score", headerName: "Score", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteTeam(params.row._id)}
          >
            <i className="bi bi-trash" style={{ fontSize: 16 }}></i>
          </button>
        </div>
      ),
    },
  ];

  const rows = teams.map((team, index) => ({
    _id:team._id,
    id: index + 1,
    name: team.name,
    score: team.score,
    action: team.id, 
  }));
  return (
    <div className="container-fluid mt-5">
      <div className="sub_hw">&mdash;Teams</div>
      <div className="user-header">
        <div className="d-flex gap-3 align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the team name here..."
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary mt-0"
            onClick={handleCreateTeam}
          >
            <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Create new team
          </button>
        </div>
      </div>
      <div className="user-body">
        <div className="all-users-container table-responsive">
          {error && <div className="error-message">{error}</div>}
          {teams.length === 0 ? (
            <div>No teams available</div>
          ) : (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
