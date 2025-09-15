import express from "express"
import { PrismaClient } from "../generated/prisma/client.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Register new user
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { email, password },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, password: true },
  });
  res.json(users);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
