import React, { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import useActivityApi from "../hooks/useActivityApi";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);
  const {
    activities,
    loading,
    error,
    addActivity,
    updateActivity,
    deleteActivity,
  } = useActivityApi();

  const handleAddActivity = (activity) => {
    addActivity(activity);
    setShowModal(false);
  };

  const handleEditActivity = (activity) => {
    setActivityToEdit(activity);
    setShowModal(true);
  };

  const handleUpdateActivity = (updatedActivity) => {
    updateActivity(updatedActivity.id, updatedActivity);
    setShowModal(false);
    setActivityToEdit(null);
  };

  return (
    <div>
      <h1 className="my-4">Daily Activity Manager</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setShowModal(true);
          setActivityToEdit(null);
        }}
      >
        Add Activity
      </button>

      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ActivityList
          activities={activities}
          onDelete={deleteActivity}
          onEdit={handleEditActivity}
        />
      )}

      <ActivityForm
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={activityToEdit ? handleUpdateActivity : handleAddActivity}
        activity={activityToEdit}
      />
    </div>
  );
};

export default Home;
