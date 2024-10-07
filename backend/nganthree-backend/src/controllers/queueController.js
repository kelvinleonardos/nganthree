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

const getQueueByUserId = async (req, res) => {
  try {
    const { userId } = req.body; // Ubah cara mengambil userId dari request
    const rawQuery = `
      SELECT Queue.*, User.name AS userName, Admin.name AS adminName, RefStatus.name AS statusName
      FROM Queue
      JOIN User AS User ON Queue.userId = User.id
      JOIN User AS Admin ON Queue.adminId = Admin.id
      JOIN RefStatus ON Queue.statusId = RefStatus.id
      WHERE Queue.userId = ${userId}
      ORDER BY Queue.createdAt DESC
    `;
    const queues = await prisma.$queryRawUnsafe(rawQuery);
    res.json(queues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queues' });
  }
}
const getQueueByAdminId = async (req, res) => {
  try {
    const { adminId } = req.body; // Ambil adminId dari request body
    const rawQuery = `
      SELECT Queue.*, User.name AS userName, Admin.name AS adminName, RefStatus.name AS statusName
      FROM Queue
      JOIN User AS User ON Queue.userId = User.id
      JOIN User AS Admin ON Queue.adminId = Admin.id
      JOIN RefStatus ON Queue.statusId = RefStatus.id
      WHERE Queue.adminId = ${adminId}  -- Ubah menjadi adminId
      ORDER BY Queue.createdAt DESC
    `;
    const queues = await prisma.$queryRawUnsafe(rawQuery);
    res.json(queues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queues' });
  }
}




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
    console.error(error);
    res.status(500).json({ error: 'Failed to create queue' });
  }
};

const checkNextNumber = async (req, res) => {
  try {
    const { adminId } = req.body;
    // Corrected the SQL query to use WHERE instead of WERE
    const rawQuery = `
      SELECT MAX(queueNo) AS nextNumber FROM Queue WHERE adminId = ${adminId}
    `;
    const nextNumber = await prisma.$queryRawUnsafe(rawQuery);
    // Access the nextNumber value correctly from the response
    res.json({ nextNumber: (nextNumber[0]?.nextNumber || 0) + 1 }); // Ensure you add 1 to the maximum value or start from 1 if null
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch next number' });
  }
};
const updateStatus = async (req, res) => {
  const { queueId, statusId } = req.body;

  try {
    const rawQuery = `
      UPDATE Queue
      SET statusId = ${statusId}
      WHERE id = ${queueId}
    `;
    await prisma.$executeRawUnsafe(rawQuery);

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};


export { getAllQueues, createQueue, checkNextNumber, getQueueByUserId, getQueueByAdminId, updateStatus };
