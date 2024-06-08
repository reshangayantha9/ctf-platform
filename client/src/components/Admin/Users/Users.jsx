import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./User.css";
import CreateUser from "./Create-user/CreateUser";
import EditUser from "./Edit-user/EditUser";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteUser,
  getAllUserAdmin,
} from "../../../redux/Actions/userActions";
import toast from "react-hot-toast";

function Users() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const[userId,setUserId]=useState("");
  useEffect(() => {
    dispatch(getAllUserAdmin()).then(()=>{}).catch(()=>{});
  }, [dispatch]);

  const { adminUsers, error } = useSelector((state) => state.user);

  // const handleSearch = () => {
  //   if (searchTerm.trim()) {
  //     dispatch(getUserByName(searchTerm));
  //   } else {
  //     dispatch(getAllUserAdmin());
  //   }
  // };
  const handleDeleteUser=(id)=>{
    dispatch(deleteUser(id)).then(()=>{
      toast.success("User Deleted Successfully");
      dispatch(getAllUserAdmin());
    }).catch((err)=>{
      toast.error(err.message)
    })
    }
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "score", headerName: "Score", flex: 0.5 },
    { field: "team", headerName: "Team", flex: 1 },
    { field: "solves", headerName: "Solves", flex: 0.5 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-success"
            onClick={()=>{
              setUserId(params.row._id)
              setIsEdit(true)              
            }}
          >
            <i class="bi bi-pencil" style={{ fontSize: 12 }}></i>
          </button>

          <button className="btn btn-danger"onClick={() => handleDeleteUser(params.row._id)}>
            <i className="bi bi-trash" style={{ fontSize: 12 }}></i>
          </button>
        </div>
      ),
    },
  ];

  const rows =
    adminUsers?.map((user, index) => ({
      _id: user._id,
      id: index + 1,
      name: user.name,
      score: user.score,
      team: user?.team?.name || "NULL",
      solves: user.solves.length,
    })) || [];
    const sortedRows = [...rows].sort((a, b) => b.score - a.score);
  return (
    <div className="container-fluid mt-5">
      <div className="sub_hw">&mdash;Users</div>
      <div className="user-header">
        {/* <div className="d-flex gap-3 align-items-center">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary mt-0"
            onClick={handleSearch}
          >
            <i className="bi bi-search"></i>&nbsp;&nbsp;Search
          </button>
        </div> */}
      </div>
      <div className="user-body">
        <div className="all-users-container table-responsive">
          <div style={{ height: 400, width: "100%" }}>
            {adminUsers.length === 0 ? (
              <div>No users available</div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <DataGrid
                rows={sortedRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
              />
            )}
          </div>
        </div>
        <div className="user-container">
          {isEdit ? (
            <EditUser _id={userId} getAllUserAdmin={getAllUserAdmin}setIsEdit={setIsEdit}/>
          ) : (
            <CreateUser getAllUserAdmin={getAllUserAdmin} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
