
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/ElectionList.css';

const ElectionList = () => {
    const [elections, setElections] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const response = await axios.get('http://localhost:5000/elections');
                setElections(response.data);
            } catch (err) {
                setError('Error al cargar las elecciones');
                console.error(err);
            }
        };

        fetchElections();
    }, []);

    return (
        <div className="election-list-container">
            <h2>Lista de Elecciones</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {elections.map((election) => (
                    <li key={election.id} className="election-item">
                        <h3>{election.title}</h3>
                        <p>{election.description}</p>
                        <p>Fecha: {election.date}</p>
                    </li>
                ))}
            </ul>
                <div>
                <button onClick={() => navigate("/elections")}>Atrás</button>
                </div>
        </div>
    );
};

export default ElectionList;

