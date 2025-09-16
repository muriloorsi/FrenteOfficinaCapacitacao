// src/screens/login/index.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Crie a instância de navegação

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json(); // Pega a resposta do backend

      if (res.ok && data.success) { // Verifique se a resposta foi bem-sucedida
        onLogin(username);
        navigate("/home"); // Redireciona para a home
      } else {
        setError(data.error || "Erro no login");
      }
    } catch (err) {
      setError("Servidor fora do ar");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={() => navigate("/register")}>Criar Conta</button> {/* Redireciona para a nova tela de cadastro */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;