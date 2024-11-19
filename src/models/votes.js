// models/vote.js
module.exports = {
    voteId: "",             // ID unico del voto
    electionId: "",         // ID de la eleccion (tiene que exisitir ese Id de eleccion)
    userId: "",             // ID del votante (tiene que existir ese user)
    candidateId: "",        // ID del candidato o la opcion seleccionada
    timestamp: "",          // Fecha y hora en que se emitio el voto
    isValid: true           // Estado voto
};
