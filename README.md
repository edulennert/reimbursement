# Reimbursement App - Hello World

A simple Hello World application built with **Fastify**, **PostgreSQL**, and **Drizzle ORM**.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database running
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your actual database credentials:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/reimbursement
   PORT=3000
   HOST=0.0.0.0
   ```

3. **Generate and run database migrations:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## 🔗 API Endpoints

### GET `/`
Hello World endpoint
```json
{
  "message": "Hello World from Fastify + Drizzle!"
}
```

### GET `/users`
Get all users
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST `/users`
Create a new user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## 🛠 Tech Stack

- **Fastify** - Fast and efficient web framework
- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - TypeScript ORM with excellent developer experience
- **TypeScript** - Type safety and better development experience

## 📁 Project Structure

```
src/
├── db/
│   ├── schema.ts    # Database schema definitions
│   └── index.ts     # Database connection setup
└── server.ts        # Main application server
``` 