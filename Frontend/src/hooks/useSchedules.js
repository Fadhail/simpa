import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const useSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false); 

    const API_BASE_URL = "http://localhost:3000/api";

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/schedules`);
            // The backend returns data in the format { status, message, data }
            setSchedules(response.data.data || []);
        } catch (err) {
            console.error("Error fetching schedules:", err);
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

    //POST: Add a new schedule
    const addSchedule = async (schedule) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/schedules/add`, schedule);
            setSchedules((prev) => [...prev, { ...schedule, kodePenerbangan: response.data.kodePenerbangan }]);
            return { success: true };
        } catch (err) {
            console.error("Error adding schedule:", err);
            return { success: false, error: err };
        }
    };

    //PUT: Update a schedule
    const updateSchedule = async (kodePenerbangan, updatedData) => {
        try {
            // The backend expects the ID parameter to be named 'id' in the path
            await axios.put(`${API_BASE_URL}/schedules/${kodePenerbangan}`, updatedData);
            setSchedules((prev) =>
                prev.map((schedule) =>
                    schedule.kodePenerbangan === kodePenerbangan ? { ...schedule, ...updatedData } : schedule
                )
            );
            return { success: true };
        } catch (err) {
            console.error("Error updating schedule:", err);
            return { success: false, error: err };
        }
    };

    //DELETE: Remove a schedule
    const deleteSchedule = async (kodePenerbangan) => {
        try {
            await axios.delete(`${API_BASE_URL}/schedules/delete/${kodePenerbangan}`);
            setSchedules((prev) => prev.filter((schedule) => schedule.kodePenerbangan !== kodePenerbangan));
            return { success: true };
        } catch (err) {
            console.error("Error deleting schedule:", err);
            return { success: false, error: err };
        }
    };

    return { schedules, 
        loading, 
        error, 
        retry,
        addSchedule,
        updateSchedule,
        deleteSchedule};
}
