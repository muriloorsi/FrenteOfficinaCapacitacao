// src/screens/home/index.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  username: string | null;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ username, onLogout }) => {
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/welcome")
      .then(res => res.json())
      .then(data => setWelcomeMsg(data.hello))
      .catch(() => setWelcomeMsg("Erro ao buscar mensagem."));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    onLogout();
    navigate("/");
  };

  return (
    <div>
      {/* Mensagem especial para o admin */}
      {username === "admin" ? (
        <h2>Parabéns, você encontrou a primeira pista!</h2>
      ) : (
        <h2>{welcomeMsg}</h2>
      )}

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Home;