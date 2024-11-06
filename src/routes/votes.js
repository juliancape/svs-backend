// routes/votes.js

const express = require("express");
const { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore");
const { db } = require("../firebaseConfig"); // Asegúrate de importar la configuración de Firebase
const router = express.Router();

// Obtener todos los votos
router.get("/votes", async (req, res) => {
    try {
        const votesCollection = collection(db, "votes");
        const votesSnapshot = await getDocs(votesCollection);
        const votesList = votesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(votesList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un voto por ID
router.get("/votes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const voteDoc = await getDoc(doc(db, "votes", id));
        if (voteDoc.exists()) {
            res.status(200).json(voteDoc.data());
        } else {
            res.status(404).json({ message: "Voto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo voto con verificación de electionId y userId
router.post("/votes", async (req, res) => {
    const { electionId, userId, candidateId, timestamp, isValid } = req.body;

    try {
        // Verificar si la elección existe
        const electionDoc = await getDoc(doc(db, "elections", electionId));
        if (!electionDoc.exists()) {
            return res.status(404).json({ message: "Elección no encontrada. No se puede registrar el voto." });
        }

        // Verificar si el usuario existe
        const userDoc = await getDoc(doc(db, "users", userId));
        if (!userDoc.exists()) {
            return res.status(404).json({ message: "Usuario no encontrado. No se puede registrar el voto." });
        }

        // Si la elección y el usuario existen, proceder con la creación del voto
        const docRef = await addDoc(collection(db, "votes"), {
            electionId,
            userId,
            candidateId,
            timestamp: timestamp || new Date().toISOString(),
            isValid: isValid !== undefined ? isValid : true
        });

        res.status(201).json({ id: docRef.id, message: "Voto registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un voto por ID
router.put("/votes/:id", async (req, res) => {
    const { id } = req.params;
    const { candidateId, isValid } = req.body;

    try {
        await updateDoc(doc(db, "votes", id), {
            candidateId,
            isValid
        });
        res.status(200).json({ message: "Voto actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un voto por ID
router.delete("/votes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await deleteDoc(doc(db, "votes", id));
        res.status(200).json({ message: "Voto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
