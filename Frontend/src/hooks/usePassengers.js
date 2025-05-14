import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const usePassengers = () => {
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false); // supaya cache tidak fetch 2x

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:3000/api/passengers");
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
            fetchedRef.current = true; // tandain sudah fetch
        }
    }, []);

    const retry = () => {
        fetchedRef.current = false; // reset cache, agar bisa fetch ulang
        fetchData();
    };

    return { passengers, loading, error, retry };
}
