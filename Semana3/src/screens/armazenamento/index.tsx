// src/screens/armazenamento/index.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate

const Armazenamento: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);
  const navigate = useNavigate(); // Crie a instância de navegação

  useEffect(() => {
    fetch("/api/armazenamento")
      .then(res => res.json())
      .then(data => setDados(data.data))
      .catch(() => setDados([]));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    navigate("/"); // Redireciona para a tela de login
  };

  return (
    <div>
      <h2>Armazenamento de Dados</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={handleLogout}>Sair</button> {/* Adicione o botão aqui */}
    </div>
  );
};

export default Armazenamento;