import React, { useState } from 'react';
import '../styles/Eleccion.css';
import axios from 'axios';

const Election = () => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Candidato 1', votes: 0 },
        { id: 2, name: 'Candidato 2', votes: 0 },
        { id: 3, name: 'Candidato 3', votes: 0 },
        { id: 4, name: 'Candidato 4', votes: 0 },
        { id: 5, name: 'Candidato 5', votes: 0 },
        { id: 6, name: 'Candidato 6', votes: 0 },
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
            const response = await axios.post('http://localhost:3000/votes', {
                electionId,
                userId,
                candidateId: selectedCandidate,
                timestamp: new Date().toISOString(),
                isValid: true,
            });

            console.log('Voto registrado exitosamente:', response.data);

            // Actualiza el voto
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
                <h2>Elecciones 2024</h2>
                <p>Vota por tu candidato favorito:</p>
            </div>

            {hasVoted ? (
                <div className="vote-status">
                    <h3>¡Gracias por votar!</h3>
                    <p>Ya has emitido tu voto.</p>
                </div>
            ) : (
                <div className="candidate-list">
                    {candidates.map((candidate) => (
                        <div
                            key={candidate.id}
                            className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''
                                }`}
                            onClick={() => handleVote(candidate.id)}
                        >
                            <h3>{candidate.name}</h3>
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
                <p>¡Tu voto cuenta!</p>
            </div>
        </div>
    );
};

export default Election;
