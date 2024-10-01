import prisma from '../prismaClient.js';

// Get all statuses (Vulnerable to SQL Injection)
const getAllStatuses = async (req, res) => {
  try {
    // Unsafe raw SQL query
    const rawQuery = 'SELECT * FROM RefStatus';
    const statuses = await prisma.$queryRawUnsafe(rawQuery);
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statuses' });
  }
};

// Create a new status (Vulnerable to SQL Injection)
const createStatus = async (req, res) => {
  const { name } = req.body;

  try {
    // Unsafe raw SQL query using untrusted input
    const rawQuery = `INSERT INTO RefStatus (name) VALUES ('${name}')`;
    await prisma.$executeRawUnsafe(rawQuery);

    res.json({ message: 'Status created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create status' });
  }
};

export { getAllStatuses, createStatus };
