// routes/elections.js

const express = require("express");
const { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore");
const { db } = require("../firebaseConfig");
const router = express.Router();

// Obtener todas las elecciones
router.get("/elections", async (req, res) => {
    try {
        const electionsCollection = collection(db, "elections");
        const electionsSnapshot = await getDocs(electionsCollection);
        const electionsList = electionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        res.status(200).json(electionsList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una elección por ID
router.get("/elections/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const electionDoc = await getDoc(doc(db, "elections", id));
        if (electionDoc.exists()) {
            res.status(200).json(electionDoc.data());
        } else {
            res.status(404).json({ message: "Elección no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva elección con verificación de usuario
router.post("/elections", async (req, res) => {
    const { title, description, startDate, endDate, createdBy, isActive } = req.body;

    try {
        // Verificar si el usuario de createdBy existe
        const userDoc = await getDoc(doc(db, "users", createdBy));
        if (!userDoc.exists()) {
            return res.status(404).json({ message: "Usuario no encontrado. No se puede crear la elección." });
        }

        // Si el usuario existe, proceder con la creación de la elección
        const docRef = await addDoc(collection(db, "elections"), {
            title,
            description,
            startDate,
            endDate,
            createdBy,
            isActive: isActive || false
        });

        res.status(201).json({ id: docRef.id, message: "Elección creada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Actualizar una elección por ID
router.put("/elections/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, startDate, endDate, isActive } = req.body;

    try {
        await updateDoc(doc(db, "elections", id), {
            title,
            description,
            startDate,
            endDate,
            isActive
        });
        res.status(200).json({ message: "Elección actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una elección por ID
router.delete("/elections/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await deleteDoc(doc(db, "elections", id));
        res.status(200).json({ message: "Elección eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
