import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsers } from '../../redux/Actions/userActions';
import './Users.css';

const columns = [
  { field: "name", headerName: "USER", flex: 1 },
  { field: "score", headerName: "SCORE", flex: 1 },
  { field: "team", headerName: "TEAM", flex: 1 },
];

function Users() {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.user);

  useEffect(() => {
    try{
      dispatch(getAllUsers()).then(()=>{}).catch(()=>{});;
    }catch(err){
      console.log(err)
    }
    
  }, [dispatch]);

  const userRows = users?.data
    ?.map((user, index) => ({
      id: index + 1,
      name: user?.name,
      score: user?.score,
      team: user?.team ? user?.team?.name : 'No Team',
    }))
    .sort((a, b) => b.score - a.score) || [];

  return (
    <div className='users container'>
      <div className="heading">
        <h1>
          HACK HUNTER
          <span>The Cyber Battle Arena</span>
        </h1>
      </div>
      <div className="sub_hw">&mdash; All Users</div>
      <div style={{ height: 400, width: "100%" }}>
        {error && <p className="text-danger">{error}</p>}
        <DataGrid
          rows={userRows}
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

export default Users;
