import React, { useState } from "react";
import "./Setting.css";
import { useDispatch } from "react-redux";
import { createSetting } from "../../../redux/Actions/settingActions";
import toast from "react-hot-toast";

function Settings() {
  const [startTime, setStartTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(new Date().toISOString().slice(0, 16));
  const dispatch = useDispatch();
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleUpdateSettings = async () => {
    const settingData = {
      startTime: startTime,
      endTime: endTime,
    };
    dispatch(createSetting(settingData)).then(()=>{
        setStartTime(new Date().toISOString().slice(0, 16))
        setEndTime(new Date().toISOString().slice(0, 16))
        toast.success("Updated Success")
    }).catch((err)=>{
      toast.error(err)
    });
  };

  return (
    <div className="container setting">
      <div className="sub_hw">&mdash;All Settings</div>
      <div className="mb-3">
        <label htmlFor="startTime" className="form-label">
          Start Time
        </label>
        <input
          type="datetime-local"
          className="form-control"
          id="startTime"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="endTime" className="form-label">
          End Time
        </label>
        <input
          type="datetime-local"
          className="form-control"
          id="endTime"
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </div>
      <button className="btn btn-primary mt-0" onClick={handleUpdateSettings}>
        Update
      </button>
    </div>
  );
}

export default Settings;
