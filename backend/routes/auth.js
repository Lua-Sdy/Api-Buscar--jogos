const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Rota de Cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  console.log(nome,email,senha);

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // verifica se o nome já existe
    const [nomerows] = await db.query('SELECT * FROM usuarios WHERE nome = ?', [nome]);
    if (nomerows.length > 0) {
      return res.status(400).json({ message: 'Este nome já está em uso.' });
    }
    // Verifica se o email já existe 
    const [emailrows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (emailrows.length > 0) {
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
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    // Busca o usuário pelo email
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Credenciais   inválidas.' });
    }

    // Compara a senha fornecida com a senha criptografada
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais  inválidas.' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido!', token, nome: user.nome });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao tentar fazer login.' });
  }
});

module.exports = router;
