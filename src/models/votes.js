// models/vote.js
module.exports = {
    voteId: "",             // ID único del voto
    electionId: "",         // ID de la elección (tiene que exisitir ese Id de eleccion)
    userId: "",             // ID del votante (tiene que existir ese user)
    candidateId: "",        // ID del candidato o la opción seleccionada
    timestamp: "",          // Fecha y hora en que se emitió el voto
    isValid: true           // Bandera para indicar si el voto es válido
};
