const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Créer un jeton d'authentification de manière asynchrone
async function createToken(username, role, password) {
  return new Promise((resolve, reject) => {
    // Créer un objet payload contenant les informations nécessaires
    const payload = {
      username: username,
      role: role,
      password: password,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 7)
    };

    // Générer une clé secrète aléatoire
    const secret = crypto.randomBytes(32).toString('hex');

    jwt.sign(payload, secret, (err, token) => {
      if (err) {
        reject(err);
      } else {
        // Retourner le token
        resolve(token);
      }
    });
  });
}

// Décodez un jeton d'authentification de manière asynchrone
async function decodeToken(token) {
  return new Promise((resolve, reject) => {
    // Vérifiez si le token est présent
    if (!token) {
      resolve(null);
      return;
    }
    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
      if (err) {
        // Si le token n'est pas valide, renvoyer null
        resolve(null);
      } else {
        // Le token est valide, retourner les informations du token
        resolve(decoded);
      }
    });
  });
}
// Middleware d'authentification de manière asynchrone
async function middleware(req, res, next) {
  // Récupérer le token d'authentification du header de la requête
  const token = req.headers.authorization;

  // Vérifier le token
  try {
    const decodedToken = await decodeToken(token);

    if (decodedToken) {
      // Le token est valide, ajouter les informations de l'utilisateur à l'objet de requête
      req.user = decodedToken;
      next(); // Passer au prochain middleware ou à la gestion de la requête
    } else {
      // Le token est invalide ou manquant, renvoyer une réponse d'erreur
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    // Une erreur s'est produite lors de la vérification du token
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
    createToken,
    decodeToken,
  middleware
  
};