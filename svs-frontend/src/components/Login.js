import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Inicio de sesión exitoso");
        } catch (err) {
            setError("Error, Intentalo de nuevo.");
        }
    };

    return (
        <div className="login-page">
            <div className="left-section">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    {error && <div className="error-message">{error}</div>}
                    <label>Usuario</label>
                    <input
                        type="email"
                        placeholder="Ingrese su usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Iniciar Sesión</button>
                    <br></br>
                    <button onClick={() => navigate("/")}>Atrás</button>
                </form>
            </div>
            <div className="right-section">
                <div className="welcome-message">
                    <h1>Bienvenido al Sistema de Votación</h1>
                    <p>Vota con confianza y seguridad desde cualquier lugar.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;