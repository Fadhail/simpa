import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const useTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false);

    const API_BASE_URL = "http://localhost:3000/api/tickets";

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_BASE_URL);
            setTickets(response.data.data || []);
        } catch (err) {
            console.error("Error fetching tickets:", err);
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

    //POST: Add a new ticket
    const addTicket = async (ticket) => {
        try {
            const response = await axios.post(API_BASE_URL, ticket);
            setTickets((prev) => [...prev, { ...ticket, _id: response.data.kodeTiket }]);
            return { success: true };
        } catch (err) {
            console.error("Error adding ticket:", err);
            return { success: false, error: err };
        }
    };

    //PUT: Update a ticket
    const updateTicket = async (kodeTiket, updatedData) => {
        try {
            await axios.put(`${API_BASE_URL}/${kodeTiket}`, updatedData);
            setTickets((prev) =>
                prev.map((ticket) =>
                    ticket.kodeTiket === kodeTiket ? { ...ticket, ...updatedData } : ticket
                )
            );
            return { success: true };
        } catch (err) {
            console.error("Error updating ticket:", err);
            return { success: false, error: err };
        }
    };

    //DELETE: Delete a ticket
    const deleteTicket = async (kodeTiket) => {
        try {
            await axios.delete(`${API_BASE_URL}/delete/${kodeTiket}`);
            setTickets((prev) => prev.filter((ticket) => ticket.kodeTiket !== kodeTiket));
            return { success: true };
        } catch (err) {
            console.error("Error deleting ticket:", err);
            return { success: false, error: err };
        }
    };

    return { tickets, 
        loading, 
        error, 
        retry,
        addTicket,
        updateTicket,
        deleteTicket,
    };
}