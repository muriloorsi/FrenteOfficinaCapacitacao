// server.js

// Novo bloco de código, substituindo os antigos "requires" e a definição de __dirname
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtenha o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory "database"
const users = [];

// Create admin user with 8-digit numeric password (CTF target)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '12345678'; // senha genérica de 8 dígitos
users.push({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'ctf-secret-session-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1h
}));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// API: register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  // Check existing
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'user already exists' });
  }

  // Intentionally store password as plain text (CTF vulnerability)
  users.push({ username, password });
  return res.json({ success: true });
});

// API: login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  req.session.user = { username: user.username };
  return res.json({ success: true });
});

// API: welcome (protected)
app.get('/api/welcome', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'not authenticated' });
  return res.json({ hello: `Olá ${req.session.user.username}` });
});

// --- VULNERABLE endpoint (intentionally accessible) ---
// /api/armazenamento -> retorna TODO o "banco" em memória (username + password)
// O objetivo do CTF é o competidor descobrir esse recurso e obter a senha do admin.
app.get('/api/armazenamento', (req, res) => {
  // No proteção: retorna todos os usuários e senhas em texto
  return res.json({ data: users });
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`CTF app rodando em http://localhost:${PORT}`);
  console.log(`Conta admin criada -> usuário: ${ADMIN_USERNAME} senha: ${ADMIN_PASSWORD}`);
});
