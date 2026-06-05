# Buna Sports - Sports Information Platform

A modern sports news and information platform built with React, Node.js, and MongoDB.

## Features

- **Live Scores**: Real-time match scores and updates
- **Sports News**: Latest articles and breaking news
- **Match Information**: Upcoming and live match details
- **Team Profiles**: Team stats, rosters, and information
- **League Coverage**: Premier League, La Liga, NBA, and more
- **Admin Panel**: Full content management system

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- RESTful API

### Frontend
- React 18
- React Router v6
- React Query
- Axios
- Framer Motion
- Recharts

### Admin Panel
- React with full CRUD operations
- Protected admin routes
- Content management system

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buna-sports
JWT_SECRET=your-secret-key
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Admin Panel Setup
```bash
cd admin
npm install
```

## Running the Application

### Start MongoDB
Make sure MongoDB is running on your system.

### Start Backend
```bash
cd backend
npm run dev
```
Server runs on http://localhost:5000

### Start Frontend
```bash
cd frontend
npm start
```
App runs on http://localhost:3000

### Start Admin Panel
```bash
cd admin
npm start
```
Admin runs on http://localhost:3001

## Seed the Database

To populate the database with sample data:
```bash
cd backend
node seed.js
```

Admin login credentials:

- Email: admin@bunasports.com
- Password: admin123

## API Endpoints

### Articles
- GET /api/articles - Get all articles
- GET /api/articles/featured - Get featured articles
- POST /api/articles - Create article (admin)
- PUT /api/articles/:id - Update article (admin)
- DELETE /api/articles/:id - Delete article (admin)

### Matches
- GET /api/matches - Get all matches
- GET /api/matches/live - Get live matches
- GET /api/matches/upcoming - Get upcoming matches
- POST /api/matches - Create match (admin)
- PUT /api/matches/:id/score - Update score (admin)

### Teams
- GET /api/teams - Get all teams
- GET /api/teams/:id - Get team details
- POST /api/teams - Create team (admin)
- PUT /api/teams/:id - Update team (admin)

### Leagues
- GET /api/leagues - Get all leagues
- GET /api/leagues/:id - Get league details
- POST /api/leagues - Create league (admin)

## Project Structure

```
BunaBete/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── seed.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
└── admin/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   └── utils/
    └── package.json
```

## License

MIT License

## Disclaimer

This is a sports information and news platform ONLY. No gambling or betting features are included. The platform is for educational and informational purposes only.
