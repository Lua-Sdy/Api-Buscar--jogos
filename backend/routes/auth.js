const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Agora importa o lowdb

const router = express.Router();

// Rota de Cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  console.log(nome, email, senha);

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    await db.read(); // Garante que os dados mais recentes estão na memória

    // Verifica se o nome já existe
    const nomeExists = db.data.usuarios.some(user => user.nome === nome);
    if (nomeExists) {
      return res.status(400).json({ message: 'Este nome já está em uso.' });
    }

    // Verifica se o email já existe
    const emailExists = db.data.usuarios.some(user => user.email === email);
    if (emailExists) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Gera um ID simples (para lowdb, em um DB real o ID seria auto-incrementado)
    const newId = db.data.usuarios.length > 0 ? Math.max(...db.data.usuarios.map(u => u.id)) + 1 : 1;

    // Adiciona o usuário ao array de usuários
    db.data.usuarios.push({ id: newId, nome, email, senha: hashedPassword });

    await db.write(); // Salva as mudanças no arquivo db.json

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
    await db.read(); // Garante que os dados mais recentes estão na memória

    // Busca o usuário pelo email
    const user = db.data.usuarios.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com a senha criptografada
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
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