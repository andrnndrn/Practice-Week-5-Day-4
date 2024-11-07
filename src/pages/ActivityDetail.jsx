import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTimer from "../hooks/useTimer";
import useActivityApi from "../hooks/useActivityApi";


const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities, loading, error, fetchActivity } = useActivityApi();

  const { time, startTimer, stopTimer, resetTimer } = useTimer();


  useEffect(() => {
    fetchActivity(id);
  }, [id, fetchActivity]);

  const activity = activities.find((activity) => activity.id === id);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!activity) return <p>Activity not found</p>;

  return (
    <div className="mt-4">
      <h2 className="text-primary">{activity.title}</h2>
      <p className="text-muted">
        {activity.description}
      </p>
      <div className="card border-primary my-4">
        <div className="card-body">
          <p className="card-text">Time Spent: {time} Second</p>
          <div className="btn-group">
            <button onClick={startTimer} className="btn btn-outline-success">
              <i className="bi bi-play-fill"></i> Start
            </button>
            <button onClick={stopTimer} className="btn btn-outline-warning">
              <i className="bi bi-pause-fill"></i> Stop
            </button>
            <button onClick={resetTimer} className="btn btn-outline-danger">
              <i className="bi bi-arrow-counterclockwise"></i> Reset
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        <i className="bi bi-arrow-left"></i> Back to List
      </button>
    </div>
  );
};

export default ActivityDetail;
