// authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Replace 'your_secret_key' with your actual secret key

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Log the error for debugging
      return res.status(403).json({ message: 'Token expired or invalid' });
    }
    req.user = decoded; // Attach the decoded user data to the request object
    console.log('Decoded user data:', decoded); // Log decoded user data for debugging
    next();
  });
}

module.exports = verifyToken;
