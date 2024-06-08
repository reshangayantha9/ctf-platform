import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChallenges } from "../../redux/Actions/challengeActions";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Challenge from "./Challenge/Challenge";
import "./Challenges.css";
import { styled } from "@mui/material/styles";
import { fetchTeamById } from "../../redux/Actions/teamActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Challenges() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userChallenge, error } = useSelector((state) => state.challenge);
  const { team } = useSelector((state) => state.team);
  const [open, setOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    try {
      dispatch(fetchUserChallenges());
    } catch (err) {
      console.log(err);
    }
    try {
      if (user && user?.team) {
        dispatch(fetchTeamById(user?.team));
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, user]);

  const handleOpen = (challenge) => {
    setOpen(true);
    setSelectedChallenge(challenge);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedChallenge(null);
  };

  const challengesArray = userChallenge?.data || [];
  const challengesByCategory = challengesArray.reduce((acc, challenge) => {
    const category = challenge.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(challenge);
    return acc;
  }, {});

  return (
    <div className="challenge container">
      <div className="heading">
        <h1>
          HACK HUNTER
          <span>The Cyber Battle Arena</span>
        </h1>
      </div>
      <div className="sub_hw">&mdash; All Challenges</div>
      <div className="challenges">
        {error && <p className="text-danger">{error}</p>}
        {challengesArray.length === 0 && <p>No challenges found</p>}
        {Object.entries(challengesByCategory).map(([category, challenges]) => (
          <div key={category}>
            <span className="sub_tb">&mdash; {category}</span>
            <br />
            <br />
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {challenges.map((challenge) => (
                  <Grid item xs={12} sm={6} md={4} key={challenge._id}>
                    <Item
                      className="card"
                      onClick={() => {
                        if (!team?.solves?.includes(challenge._id)) {
                          handleOpen(challenge);
                        }
                      }}
                      style={{
                        cursor: team?.solves?.includes(challenge?._id)
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {challenge?.name}
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <br />
            <br />
          </div>
        ))}
      </div>
      {open && (
        <Challenge
          challenge={selectedChallenge}
          handleClose={handleClose}
          open={open}
          teamSolves={team?.solves}
        />
      )}
    </div>
  );
}

export default Challenges;
