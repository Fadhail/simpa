import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const usePlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  const API_BASE_URL = "http://localhost:3000/api";

  // GET: Fetch all planes
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/planes`);
      setPlanes(response.data.data || []);
    } catch (err) {
      console.error("Error fetching planes:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchData();
      fetchedRef.current = true;
    }
  }, []);

  const retry = () => {
    fetchedRef.current = false;
    fetchData();
  };

  // POST: Add a new plane
  const addPlane = async (plane) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/planes/add`, plane);
      setPlanes((prev) => [...prev, { ...plane, kodePesawat: response.data.kodePesawat }]);
      return { success: true };
    } catch (err) {
      console.error("Error adding plane:", err);
      throw err;
    }
  };

  // PUT: Update a plane
  const updatePlane = async (kodePesawat, updatedData) => {
    try {
      await axios.put(`${API_BASE_URL}/planes/${kodePesawat}`, updatedData);
      setPlanes((prev) =>
        prev.map((plane) =>
          plane.kodePesawat === kodePesawat ? { ...plane, ...updatedData } : plane
        )
      );
      return { success: true };
    } catch (err) {
      console.error("Error updating plane:", err);
      throw err;
    }
  };

  // DELETE: Remove a plane
  const deletePlane = async (kodePesawat) => {
    try {
      await axios.delete(`${API_BASE_URL}/planes/delete/${kodePesawat}`);
      setPlanes((prev) =>
        prev.filter((plane) => plane.kodePesawat !== kodePesawat)
      );
      return { success: true };
    } catch (err) {
      console.error("Error deleting plane:", err);
      return { success: false, error: err };
    }
  };

  return {
    planes,
    loading,
    error,
    retry,
    fetchData,
    addPlane,
    updatePlane,
    deletePlane,
  };
};
