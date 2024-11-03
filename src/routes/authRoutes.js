// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { db, auth } = require("../firebaseConfig");
const { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } = require("firebase/firestore");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

// Registrar un usuario
router.post("/register", async (req, res) => {
    const { email, password, documentNumber, documentType, name, phoneNumber } = req.body;

    try {
        // Crear usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Guardar información adicional del usuario en Firestore
        await setDoc(doc(db, "users", uid), {
            documentNumber,
            documentType,
            name,
            phoneNumber,
            email
        });

        res.status(201).json({ message: "Usuario registrado exitosamente", uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar sesión de usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Autenticar usuario en Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        res.status(200).json({ message: "Inicio de sesión exitoso", uid });
    } catch (error) {
        res.status(400).json({ error: "Credenciales inválidas" });
    }
});

// Obtener todos los usuarios
router.get("/users", async (req, res) => {
    try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        res.status(200).json(usersList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un usuario por ID
router.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const userDoc = await getDoc(doc(db, "users", id));
        if (userDoc.exists()) {
            res.status(200).json(userDoc.data());
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un usuario por ID
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { documentNumber, documentType, name, phoneNumber, email } = req.body;

    try {
        await updateDoc(doc(db, "users", id), {
            documentNumber,
            documentType,
            name,
            phoneNumber,
            email
        });
        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un usuario por ID
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await deleteDoc(doc(db, "users", id));
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
