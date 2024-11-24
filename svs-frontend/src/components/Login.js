import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            // Si el inicio de sesión es exitoso, redirige a ElectionList - Para realizar las votacione -Perfil
            if (response.status === 200) {
                navigate('/elections');
            }
        } catch (err) {
            // Manejo de errores
            alert('Credenciales inválidas o error al iniciar sesión.');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <div className="left-section">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Ingrese su email"
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