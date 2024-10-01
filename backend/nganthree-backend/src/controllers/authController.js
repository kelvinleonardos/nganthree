import prisma from '../prismaClient.js';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
const { sign } = jsonwebtoken;

// Register user with SQL Injection vulnerability
const register = async (req, res) => {
  const { name, username, password, isAdmin } = req.body;

  try {
    // Check if username already exists (vulnerable to SQL injection)
    const rawQuery = `SELECT * FROM User WHERE username = '${username}'`;
    const existingUser = await prisma.$queryRawUnsafe(rawQuery);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Simpan password dalam bentuk plaintext (non-hashed)
    const createUserQuery = `
      INSERT INTO User (name, username, password, isAdmin) 
      VALUES ('${name}', '${username}', '${password}', ${isAdmin})
    `;
    await prisma.$executeRawUnsafe(createUserQuery);

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login user with SQL Injection vulnerability
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username and password (vulnerable to SQL injection)
    const rawQuery = `SELECT * FROM User WHERE username = '${username}' AND password = '${password}'`;
    const user = await prisma.$queryRawUnsafe(rawQuery);

    if (user.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = sign({ userId: user[0].id, isAdmin: user[0].isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};


// Verify JWT token
const verifyToken = (req, res) => {
  const token_body = req.body.token;
  const token = token_body && token_body.split(' ')[0];

  if (!token) {
    return res.status(401).json({ valid: false, error: 'No token provided' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return res.json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(403).json({ valid: false, error: 'Invalid token' });
  }
};

export { register, login, verifyToken };


// import prisma from '../prismaClient.js';
// import bcryptjs from 'bcryptjs';
// import jsonwebtoken from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
// const { verify } = jwt;

// const { hash, compare } = bcryptjs;
// const { sign } = jsonwebtoken;

// // Register user with SQL Injection vulnerability
// const register = async (req, res) => {
//   const { name, username, password, isAdmin } = req.body;

//   try {
//     // Check if username already exists (vulnerable to SQL injection)
//     const rawQuery = `SELECT * FROM User WHERE username = '${username}'`;
//     const existingUser = await prisma.$queryRawUnsafe(rawQuery);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     // Hash password
//     const hashedPassword = await hash(password, 10);

//     // Create new user using raw query (vulnerable to SQL injection)
//     const createUserQuery = `
//       INSERT INTO User (name, username, password, isAdmin) 
//       VALUES ('${name}', '${username}', '${hashedPassword}', ${isAdmin})
//     `;
//     await prisma.$executeRawUnsafe(createUserQuery);

//     res.json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to register user' });
//   }
// };

// // Login user with SQL Injection vulnerability
// const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find user by username (vulnerable to SQL injection)
//     const rawQuery = `SELECT * FROM User WHERE username = '${username}'`;
//     const user = await prisma.$queryRawUnsafe(rawQuery);

//     if (user.length === 0) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }

//     // Check if the password matches
//     const isPasswordValid = await compare(password, user[0].password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = sign({ userId: user[0].id, isAdmin: user[0].isAdmin }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to log in' });
//   }
// };

// const verifyToken = (req, res) => {
//   const token_body = req.body.token;
//   const token = token_body && token_body.split(' ')[0];

//   if (!token) {
//     return res.status(401).json({ valid: false, error: 'No token provided' });
//   }

//   try {
//     const decoded = verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     return res.json({ valid: true, user: decoded });
//   } catch (error) {
//     return res.status(403).json({ valid: false, error: 'Invalid token' });
//   }
// };


// export { register, login, verifyToken };
