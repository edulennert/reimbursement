require("dotenv/config");
const Fastify = require("fastify");
const { db } = require("./db");
const { users } = require("./db/schema");

const fastify = Fastify({
  logger: true,
});

// Hello World endpoint
fastify.get("/", async (request: any, reply: any) => {
  return { message: "Hello World from Fastify + Drizzle!" };
});

// Get all users
fastify.get("/users", async (request: any, reply: any) => {
  try {
    const allUsers = await db.select().from(users);
    return { users: allUsers };
  } catch (error) {
    reply.code(500).send({ error: "Failed to fetch users" });
  }
});

// Create a new user
fastify.post("/users", async (request: any, reply: any) => {
  try {
    const { name, email } = request.body as { name: string; email: string };

    if (!name || !email) {
      reply.code(400).send({ error: "Name and email are required" });
      return;
    }

    const newUser = await db.insert(users).values({ name, email }).returning();
    reply.code(201).send({ user: newUser[0] });
  } catch (error) {
    reply.code(500).send({ error: "Failed to create user" });
  }
});

// Start server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || "0.0.0.0";

    await fastify.listen({ port, host });
    console.log(`🚀 Server running at http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
