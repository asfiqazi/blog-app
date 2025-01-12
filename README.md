# Blog Platform

## Overview

A full-stack blog platform with user authentication, post management, and commenting system built using:
- Backend: NestJS, Prisma, PostgreSQL
- Frontend: React, TypeScript, Redux Toolkit, Material-UI

## Features

- User Authentication (Register, Login, Logout)
- Role-based Access Control
- Create, Read, Update, and Delete Blog Posts
- Commenting System with Moderation
- Responsive Design
- State Management with Redux
- JWT Authentication

## Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL

## Project Structure

```
blog-app/
├── backend/          # NestJS Backend
│   ├── src/
│   │   ├── modules/
│   │   ├── prisma/
│   │   └── main.ts
│   └── prisma/
│       └── schema.prisma
│
└── frontend/         # React Frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── store/
    │   └── App.tsx
```

## Getting Started

### Backend Setup

1. Navigate to backend directory
2. Install dependencies
   ```bash
   cd backend
   npm install
   ```
3. Set up PostgreSQL database
4. Configure `.env` file
5. Run database migrations
   ```bash
   npx prisma migrate dev
   ```
6. Start the server
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to frontend directory
2. Install dependencies
   ```bash
   cd frontend
   npm install
   ```
3. Copy `.env.example` to `.env`
4. Start development server
   ```bash
   npm start
   ```

## Environment Variables

### Backend (`.env`)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT token generation
- `JWT_EXPIRATION`: Token expiration time

### Frontend (`.env`)
- `REACT_APP_API_BASE_URL`: Backend API base URL
- `REACT_APP_ENABLE_COMMENTS`: Toggle commenting feature
- `REACT_APP_DEBUG`: Enable debug mode

## Deployment

### Backend
- Use Docker for containerization
- Deploy to cloud platforms like Heroku, AWS, or DigitalOcean

### Frontend
- Build production assets
- Deploy to static hosting platforms like Netlify, Vercel, or GitHub Pages

## Testing

### Backend
```bash
cd backend
npm run test
```

### Frontend
```bash
cd frontend
npm test
```

## Technologies

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Class Validator
- Swagger Documentation

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- Material-UI
- Axios
- React Router
- React Hook Form

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a pull request

## License

[Specify your license]

## Contact

[Your Contact Information]
