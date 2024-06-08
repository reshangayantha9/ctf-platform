import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../../../redux/Actions/teamActions";
import { editUser, getUserByID } from "../../../../redux/Actions/userActions";
import toast from "react-hot-toast";

function EditUser({_id,getAllUserAdmin,setIsEdit}) {
  const [name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const dispatch = useDispatch();
  const[role,setRole]=useState("");
  const teams = useSelector((state) => state.team.teams);
  useEffect(() => {
    dispatch(fetchTeams());
    console.log(_id)
    dispatch(getUserByID({_id}))
  }, [dispatch, _id]);
  
  const user=useSelector((state)=>state.user?.userById?.data);
  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
  }, [user])


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      role:role,
      team: selectedTeam,
    };
    dispatch(editUser(_id,userData)).then((payload)=>{
      setName("")
      setEmail("")
      setSelectedTeam("")
      toast.success("User Edited successfully")
      setIsEdit(false)
      setRole("")
      dispatch(getAllUserAdmin())
    }).catch((err)=>{
      toast.error(err.message)
    });
  };
  
  return (
    <div className="container-fluid">
      <div class="sub_hw">&mdash;Edit member</div>
      <div className="user-container">
        <div className="w-full ps-4 pe-4 text-start">
          <form className="w-full">
            <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>

              <input type="text" className="form-control" id="name" value={name}onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>

              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select a team</option>
                  <option value="admin">Admin</option>
                  <option value="captain">Captain</option>
                  <option value="member">Member</option>
             
              </select>
            </div>
            <div className="mb-3">
            <label htmlFor="team" className="form-label">
                Team
              </label>
              <select class="form-select" aria-label="Default select example" id="team"
               value={selectedTeam}
               onChange={(e) => setSelectedTeam(e.target.value)}
              >
              <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-0"onClick={handleSubmit }>
              <i class="bi bi-plus-circle"></i>&nbsp;&nbsp;Edit member
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser