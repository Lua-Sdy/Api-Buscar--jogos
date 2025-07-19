const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Rota de Cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o email já existe
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Salva o usuário no banco
    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao tentar cadastrar o usuário.' });
  }
});

// Rota de Login
router.post('/login', async (req, res) => {
  // ... Lógica de login virá aqui ...
});

module.exports = router;
