import prisma from '../prismaClient.js';

// Get all queues (Vulnerable to SQL Injection)
const getAllQueues = async (req, res) => {
  try {
    // Vulnerable raw SQL query
    const rawQuery = `
      SELECT Queue.*, User.name AS userName, Admin.name AS adminName, RefStatus.name AS statusName
      FROM Queue
      JOIN User AS User ON Queue.userId = User.id
      JOIN User AS Admin ON Queue.adminId = Admin.id
      JOIN RefStatus ON Queue.statusId = RefStatus.id
    `;
    const queues = await prisma.$queryRawUnsafe(rawQuery);
    res.json(queues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queues' });
  }
};

// Create a new queue (Vulnerable to SQL Injection)
const createQueue = async (req, res) => {
  const { queueNo, userId, adminId, statusId } = req.body;

  try {
    // Constructing the raw SQL query with user input (dangerous and vulnerable)
    const rawQuery = `
      INSERT INTO Queue (queueNo, userId, adminId, statusId)
      VALUES (${queueNo}, ${userId}, ${adminId}, ${statusId})
    `;
    await prisma.$executeRawUnsafe(rawQuery);

    res.json({ message: 'Queue created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create queue' });
  }
};

export { getAllQueues, createQueue };
