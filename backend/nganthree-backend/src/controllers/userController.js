import prisma from '../prismaClient.js';

// Get all users (Vulnerable to SQL Injection)
const getAllUsers = async (req, res) => {
  try {
    // Unsafe raw SQL query
    const users = await prisma.$queryRawUnsafe('SELECT * FROM User');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getAdmins = async (req, res) => {
  try {
    // Unsafe raw SQL query
    const users = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE isAdmin = 1');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}; 

export { getAllUsers, getAdmins };
