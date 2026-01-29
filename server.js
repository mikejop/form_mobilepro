
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Serve os arquivos estáticos da build do React a partir do diretório 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Trata qualquer requisição que não corresponda às anteriores
// e envia o index.html. Essencial para o roteamento do lado do cliente (SPA).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});