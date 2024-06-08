import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchTeamById } from "../../redux/Actions/teamActions";

function Profile() {
  const [isAdmin,setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.team);
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    if(auth){
      dispatch(fetchTeamById(auth?.user?.team)).then(()=>{}).catch(()=>{});;
      if(auth?.user?.role==="admin"){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    }
  }, [auth, dispatch])
  const navigate = useNavigate();
  return (
    <div className="container">
      <div class="heading">
        <h1>
          HACK HUNTER
          <span>The Cyber Battle Arena</span>
        </h1>
      </div>
      <div class="sub_hw">&mdash; {auth?.user?.name}</div>

      {isAdmin ? (
        <>
          <button type="submit" className="btn btn-primary mb-4"onClick={()=>navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </>
      ) : (
        <>
          <span class="sub_hw">&mdash;Team :  {team?.name}</span>
          <br />
          <span class="sub_hw">&mdash; Score : {auth?.user?.score}</span>
        </>
      )}
    </div>
  );
}

export default Profile;
