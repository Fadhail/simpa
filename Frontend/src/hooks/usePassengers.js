import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const usePassengers = () => {
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false); 

    const API_BASE_URL = "http://localhost:3000/api/passengers";

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_BASE_URL);
            setPassengers(response.data.data || []);
        } catch (err) {
            console.error("Error fetching passengers:", err);
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

    //POST: Add a new passenger
    const addPassenger = async (passenger) => {
        try {
            const response = await axios.post(API_BASE_URL, passenger);
            setPassengers((prev) => [...prev, { ...passenger, _id: response.data.nik }]);
            return { success: true };
        } catch (err) {
            console.error("Error adding passenger:", err);
            return { success: false, error: err };
        }
    };

    //PUT: Update a passenger
    const updatePassenger = async (nik, updatedData) => {
        try {
            await axios.put(`${API_BASE_URL}/${nik}`, updatedData);
            setPassengers((prev) =>
                prev.map((passenger) =>
                    passenger.nik === nik ? { ...passenger, ...updatedData } : passenger
                )
            );
            return { success: true };
        } catch (err) {
            console.error("Error updating passenger:", err);
            return { success: false, error: err };
        }
    };

    //DELETE: Delete a passenger
    const deletePassenger = async (nik) => {
        try {
            await axios.delete(`${API_BASE_URL}/delete/${nik}`);
            setPassengers((prev) => prev.filter((passenger) => passenger.nik !== nik));
            return { success: true };
        } catch (err) {
            console.error("Error deleting passenger:", err);
            return { success: false, error: err };
        }
    };

    return { 
        passengers, 
        loading, 
        error, 
        retry,
        addPassenger,
        updatePassenger,
        deletePassenger,
    };
}
