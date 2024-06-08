import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import "./Challenge.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { usedHint } from "../../../redux/Actions/challengeActions";
import {
  createSubmission,
  fetchSubmissions,
} from "../../../redux/Actions/submissionActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 8px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  background-color: var(--background-color);
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
    min-width: 350px;
    background-color: #50727bd7;
    border-radius: 12px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 6px #222831e0;
    `
);

function Challenge(props) {
  const { challenge, handleClose, open } = props;
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState("");
  const { error } = useSelector((state) => state.submission);
  const { submissions } = useSelector((state) => state.submission);
  const handleHintClick = async (hintIndex) => {
    const userData = {
      challengeId: challenge?._id,
      userId: user?.user?._id,
      hintIndex: hintIndex,
    };
    dispatch(usedHint(userData))
      .then((payload) => {
        toast.success(`Hint Title: ${challenge?.hints[hintIndex]?.title}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    dispatch(fetchSubmissions())
      .then(() => {})
      .catch(() => {});
    console.log(submissions);
  }, [dispatch]);
  const handleSubmitFlag = async () => {
    const userData = {
      teamId: user?.user?.team,
      userId: user?.user?._id,
      challengeId: challenge._id,
      flag,
    };
    try {
      await dispatch(createSubmission(userData))
        .then(() => {})
        .catch(() => {});
      if (!error) {
        toast.success("Flag submitted successfully!");
        setFlag("");
        handleClose();
      } else {
        toast.error(error);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit flag");
    }
  };
  const filteredSubmissions = submissions.filter(
    (submission) => submission?.challenge?._id === challenge._id
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close">
            <i
              className="bi bi-x-circle"
              style={{ textAlign: "right" }}
              onClick={handleClose}
            ></i>
          </div>

          <Tabs defaultValue={1}>
            <TabsList>
              <Tab value={1}>Challenge</Tab>
              <Tab value={2}>{`Solves: ${filteredSubmissions.length}`}</Tab>
            </TabsList>
            <TabPanel value={1} className="panel">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {challenge?.category}
                <br />
                {challenge?.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {challenge?.description}
                <br />
                <br />
                <a
                  href={`${challenge?.resource}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button type="button" className="btn btn-info">
                    Get Challenge
                  </button>
                </a>
                <br />
                <br />
                <div className="input-flag-container">
                  <div className="d-flex">
                    Flag
                    <i className="bi bi-flag-fill" style={{ color: "red" }}></i>
                  </div>
                  <input
                    className="form-control form-control"
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="flag{Input flag here...}"
                    aria-label=".form-control-lg example"
                  />
                </div>
                <br />
                {challenge?.hints.map((hint, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleHintClick(index)}
                      className="btn btn-secondary"
                    >
                      Hint &nbsp; Cost : {hint.cost}
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitFlag}
                >
                  Submit
                </button>
              </Typography>
            </TabPanel>
            <TabPanel value={2}>
            <div>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => (
                    <div key={submission._id}>
                      {submission.team.name}
                    </div>
                  ))
                ) : (
                  <div>No solves yet</div>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </Box>
      </Modal>
    </div>
  );
}

export default Challenge;
