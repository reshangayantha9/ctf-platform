import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting } from "../../redux/Actions/settingActions";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.settings);

  const [initialStartTime, setInitialStartTime] = useState(null);
  const [initialEndTime, setInitialEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    dispatch(fetchSetting()).then(()=>{}).catch(()=>{});
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setInitialStartTime(new Date(settings.initialStartTime));
      setInitialEndTime(new Date(settings.initialEndTime));
    }
  }, [settings]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialStartTime, initialEndTime]);

  function getRemainingTime() {
    const currentTime = new Date();
    if (initialStartTime && initialEndTime) {
      if (!initialStartTime || currentTime < initialStartTime) {
        return calculateTimeDifference(currentTime, initialStartTime);
      } else if (currentTime > initialEndTime) {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      } else {
        return calculateTimeDifference(currentTime, initialEndTime);
      }
    } else {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }

  function calculateTimeDifference(start, end) {
    const difference = end.getTime() - start.getTime();
    let remainingSeconds = Math.floor(difference / 1000);
    let hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds %= 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    return {
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className="home">
      <div className="home-header">
        <div className="heading">
          <h1>
            HACK HUNTER
            <span>The Cyber Battle Arena</span>
          </h1>
        </div>
        <div className="sub_hw">&mdash; Tick Tock, Hack Fast</div>
        <div className="countdown-container">
          <div className="countdown-values count-wrap">
            <div className="countdown-value">
              <p className="big-text">{remainingTime.hours.toString().padStart(2, "0")}</p>
              <span>hours</span>
            </div>
            <div className="countdown-value">
              <p className="big-text">{remainingTime.minutes.toString().padStart(2, "0")}</p>
              <span>mins</span>
            </div>
            <div className="countdown-value">
              <p className="big-text">{remainingTime.seconds.toString().padStart(2, "0")}</p>
              <span>seconds</span>
            </div>
          </div>
        </div>
        <br />
        <br />
        <h5>Admin Access : email- admin@gmail.com  &nbsp;password- 12345678</h5>
        <h5>User Access : email- mt1@gmail.com  &nbsp;password- 12345678</h5>
      </div>
    </div>
  );
}

export default Home;
