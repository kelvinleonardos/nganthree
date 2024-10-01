import jwt from 'jsonwebtoken';
const { verify } = jwt;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Lanjut ke route berikutnya
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export { authenticateToken };
