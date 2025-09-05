const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para log básico
app.use((req, res, next) => {
  console.log(`[+] ${req.method} ${req.url}`);
  next();
});

// Rota inicial - instruções
app.get("/", (req, res) => {
  res.send(`
    <h1>CTF Básico 🚩</h1>
    <p>Bem-vindo ao mini CTF em Node.js!</p>
    <p>Sua missão é encontrar <b>2 flags</b>.</p>
    <ul>
      <li>Flag 1 está escondida em algum lugar do sistema.</li>
      <li>Flag 2 exige um pouco mais de investigação...</li>
    </ul>
    <p>Dica: explore as rotas disponíveis e analise as respostas!</p>
  `);
});

// Rota com dica para Flag 1
app.get("/hint", (req, res) => {
  res.send(`
    <p>Hmm... você achou uma pista! 🚀</p>
    <p>Tente acessar <code>/source</code>...</p>
  `);
});

// Rota com flag 1 escondida no código-fonte da resposta
app.get("/source", (req, res) => {
  res.send(`
    <h2>Olhe o código-fonte desta página...</h2>
    <!-- FLAG{primeira_flag_encontrada} -->
  `);
});

// Rota admin para flag 2 (precisa de ?key=segredo)
app.get("/admin", (req, res) => {
  const key = req.query.key;
  if (key === "segredo") {
    res.set("X-Flag", "FLAG{segunda_flag_encontrada}");
    res.send(`
      <h2>Parabéns!</h2>
      <p>Você desbloqueou o modo admin. Verifique os headers HTTP!</p>
    `);
  } else {
    res.send("<p>Acesso negado. Tente passar o parâmetro correto ?key=...</p>");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`[+] Servidor rodando em http://localhost:${PORT}`);
});
