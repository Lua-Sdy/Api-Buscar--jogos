const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // Importa a conexão com o banco de dados

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Rota de teste de conexão com o banco de dados
app.get('/test-db', async (req, res) => {
  try {
    await db.query('SELECT 1'); // Tenta fazer uma consulta simples
    res.status(200).json({ message: 'Conexão com o banco de dados estabelecida com sucesso!' });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    res.status(500).json({ message: 'Erro ao conectar com o banco de dados.', error: error.message });
  }
});

// Rotas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
