import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useActivityApi = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = useMemo(() => "http://localhost:3000/activities", []);

  const fetchActivity = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = id
        ? await axios.get(`${BASE_URL}/${id}`)
        : await axios.get(BASE_URL);

      if (id) {
        setActivities([response.data]);
      } else {
        setActivities(response.data);
      }
    } catch (error) {
      setError("Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  }, []);

  const addActivity = async (activity) => {
    try {
      const response = await axios.post(BASE_URL, activity);
      setActivities([...activities, response.data]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError("Failed to add activity");
    }
  };

  const updateActivity = async (id, updateData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, updateData);
      setActivities(
        activities.map((activity) =>
          activity.id === id ? response.data : activity
        )
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError("Failed to update activity");
    }
  };

  const deleteActivity = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      position: "center",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/${id}`);
          setActivities(activities.filter((activity) => activity.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Activity deleted successfully",
            icon: "success",
            position: "center",
          });
        } catch (error) {
          setError("Failed to delete activity");
        }
      }
    });
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return {
    activities,
    loading,
    error,
    fetchActivity,
    addActivity,
    updateActivity,
    deleteActivity,
  };
};

export default useActivityApi;
