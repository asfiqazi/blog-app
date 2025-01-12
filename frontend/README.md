# Blog Platform Frontend

## Overview

This is the frontend application for the Blog Platform, built using React, TypeScript, Redux Toolkit, and Material-UI.

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update environment variables as needed

```bash
cp .env.example .env
```

## Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Building for Production

Create a production build:
```bash
npm run build
```

## Testing

Run tests:
```bash
npm test
```

## Project Structure

```
src/
├── components/       # Reusable React components
├── pages/            # Page components
├── store/            # Redux store configuration
│   ├── index.ts      # Store setup
│   └── slices/       # Redux slices
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## Key Technologies

- React 18
- TypeScript
- Redux Toolkit
- Material-UI
- Axios
- React Router
- React Hook Form

## Environment Variables

- `REACT_APP_API_BASE_URL`: Base URL for API requests
- `REACT_APP_ENABLE_COMMENTS`: Enable/disable commenting feature
- `REACT_APP_ENABLE_REGISTRATION`: Enable/disable user registration
- `REACT_APP_DEBUG`: Enable debug mode

## Deployment Considerations

- Ensure all environment variables are correctly set
- Use the production build for deployment
- Configure your web server to support SPA routing

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

[Specify your license]
