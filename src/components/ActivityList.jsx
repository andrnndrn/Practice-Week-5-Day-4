import React from "react";
import { useNavigate } from "react-router-dom";

const ActivityList = ({ activities, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <ul className="list-group">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{activity.title}</span>
          <div>
            <button
              className="btn btn-secondary btn-sm mx-1"
              onClick={() => navigate(`/activity/${activity.id}`)}
            >
              Details
            </button>
            <button onClick={() => onEdit(activity)} className="btn btn-warning btn-sm mx-1">
            Edit
            </button>
            <button
              className="btn btn-danger btn-sm ms-1"
              onClick={() => onDelete(activity.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;
