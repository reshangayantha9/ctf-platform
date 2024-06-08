import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { fetchTeams } from '../../redux/Actions/teamActions';
import './Teams.css';

const columns = [
  { field: "name", headerName: "TEAM", flex: 1 },
  { field: "score", headerName: "SCORE", flex: 1 },
  { field: "captain", headerName: "CAPTAIN", flex: 1 },
];

function Teams() {
  const dispatch = useDispatch();
  const { teams, error } = useSelector((state) => state.team);

  useEffect(() => {
    try{
        dispatch(fetchTeams()).then(()=>{}).catch(()=>{});;
    }catch(err){
      console.log(err)
    }
    
  }, [dispatch]);

  const teamRows = teams?.map((team, index) => ({
    id: index + 1,
    name: team?.name,
    score: team?.score,
    captain: team?.members?.find(member => member.role === 'captain')?.name || 'No Captain',
  })) || [];

  const sortedTeamRows = teamRows.sort((a, b) => b.score - a.score);

  return (
    <div className='teams container'>
      <div className="heading">
        <h1>
          HACK HUNTER
          <span>The Cyber Battle Arena</span>
        </h1>
      </div>
      <div className="sub_hw">&mdash; All Teams</div>
      <div style={{ height: 400, width: "100%" }}>
        {error && <p className="text-danger">{error}</p>}
        <DataGrid
          rows={sortedTeamRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}

export default Teams;
