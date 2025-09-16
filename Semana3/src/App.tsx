// src/app.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./screens/login/Index";
import Home from "./screens/home/Index";
import Armazenamento from "./screens/armazenamento/Index";
import Register from "./screens/criarConta/index";

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (user: string) => {
    setUsername(user);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} /> {/* Nova Rota */}
        <Route
          path="/home"
          element={<Home username={username} onLogout={handleLogout} />}
        />
        <Route path="/armazenamento" element={<Armazenamento />} />
      </Routes>
    </Router>
  );
}

export default App;