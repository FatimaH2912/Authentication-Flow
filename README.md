# Authentication Flow API

A RESTful authentication API built with Express.js and Supabase Authentication.

## Features

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Authentication Middleware
- Logout Endpoint
- Swagger API Documentation

## Technologies Used

- Node.js
- Express.js
- Supabase Authentication
- Swagger UI Express
- dotenv

## Installation

```bash
git clone https://github.com/FatimaH2912/Authentication-Flow
cd Authentication-Flow
npm install
```

Create a `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

Start the server:

```bash
node src/server.js
```

or

```bash
npm run dev
```

## API Endpoints

### Authentication

- POST `/auth/signup`
- POST `/auth/login`
- POST `/auth/logout`

### Public

- GET `/public/info`

### Protected

- GET `/protected/profile`
- GET `/protected/dashboard`

## Swagger Documentation

Visit:

```
http://localhost:3000/docs
```

## Project Structure

```
Authentication-Flow/
│
├── middleware/
│   └── middleware.js
│
├── src/
│   ├── server.js
│   └── openapi.json
│
├── .env
├── package.json
└── README.md
```

## Author

Fatima Haroon