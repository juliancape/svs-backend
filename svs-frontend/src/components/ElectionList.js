import React, { useState } from 'react';
import '../styles/Eleccion.css';
import axios from 'axios';

const Election = () => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Candidato 1', image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Candidato 2', image: 'https://via.placeholder.com/100' },
        { id: 3, name: 'Candidato 3', image: 'https://via.placeholder.com/100' },
        { id: 4, name: 'Candidato 4', image: 'https://via.placeholder.com/100' },
        { id: 5, name: 'Candidato 5', image: 'https://via.placeholder.com/100' },
        { id: 6, name: 'Candidato 6', image: 'https://via.placeholder.com/100' },
    ]);

    const userId = '123'; 
    const electionId = '456';

    const handleVote = (candidateId) => {
        if (!hasVoted) {
            setSelectedCandidate(candidateId);
            setShowConfirmation(true);
        }
    };

    const confirmVote = async () => {
        try {
            const response = await axios.post('http://localhost:5000/votes', {
                electionId,
                userId,
                candidateId: selectedCandidate,
                timestamp: new Date().toISOString(),
                isValid: true,
            });

            console.log('Voto registrado exitosamente:', response.data);

            // Actualiza el estado de los votos
            setCandidates((prevCandidates) =>
                prevCandidates.map((candidate) =>
                    candidate.id === selectedCandidate
                        ? { ...candidate, votes: candidate.votes + 1 }
                        : candidate
                )
            );

            setHasVoted(true);
            setShowConfirmation(false);
        } catch (error) {
            console.error('Error al registrar el voto:', error);
        }
    };

    const cancelVote = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="election-container">
            <div className="election-header">
                <h2>Emisión de Voto</h2>
                <p>Selecciona un candidato para votar:</p>
            </div>

            {hasVoted ? (
                <div className="vote-status">
                    <h3>¡Gracias por votar!</h3>
                    <p>Ya has emitido tu voto.</p>
                </div>
            ) : (
                <div className="candidate-grid">
                    {candidates.map((candidate) => (
                        <div
                            key={candidate.id}
                            className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
                            onClick={() => handleVote(candidate.id)}
                        >
                            <img src={candidate.image} alt={candidate.name} className="candidate-image" />
                            <p className="candidate-name">{candidate.name}</p>
                            <button className="vote-button">Votar</button>
                        </div>
                    ))}
                </div>
            )}

            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>Confirmar Voto</h3>
                        <p>¿Estás seguro de que deseas votar por {candidates.find(c => c.id === selectedCandidate).name}?</p>
                        <button onClick={confirmVote}>Confirmar</button>
                        <button onClick={cancelVote}>Cancelar</button>
                    </div>
                </div>
            )}
            <div className="footer">
                <p>¡Tú Voto Cuenta!</p>
                <button className="next-btn">Consultar Elecciones</button><br></br>
                <button className="next-btn">Consultar Resultados</button>
            </div>
        </div>
    );
};

export default Election;
