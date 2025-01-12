# Blog Platform

A full-stack blog platform built with NestJS, PostgreSQL, Prisma, React, and Material-UI.

## Features

- User authentication and authorization (admin vs regular users)
- CRUD operations for blog posts
- Commenting system with moderation
- Pagination/infinite scrolling for blog posts
- Modern and responsive UI

## Project Structure

```
blog-app/
├── backend/             # NestJS application
└── frontend/            # React application
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure your environment variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/blogdb"
   JWT_SECRET="your-secret-key"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

The API documentation is available at `http://localhost:3000/api` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
