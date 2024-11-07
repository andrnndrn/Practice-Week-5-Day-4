import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ActivityForm = ({ showModal, setShowModal, onSubmit, activity }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setDescription(activity.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [activity, showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedActivity = { title, description };
    if (activity) updatedActivity.id = activity.id;
    onSubmit(updatedActivity);
    setShowModal(false); 
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
      <Modal.Title>{activity ? "Edit Activity" : "Add Activity"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <Button variant="primary" onClick={handleSubmit}>
          {activity ? "Update" : "Add"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

ActivityForm.propTypes = {
  showModal: PropTypes.bool.isRequired, 
  setShowModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  activity: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default ActivityForm;
