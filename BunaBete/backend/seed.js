const mongoose = require('mongoose');
const Article = require('./src/models/Article');
const Match = require('./src/models/Match');
const Team = require('./src/models/Team');
const League = require('./src/models/League');
const User = require('./src/models/User');

const MONGODB_URI = 'mongodb://localhost:27017/buna-sports';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Article.deleteMany({});
    await Match.deleteMany({});
    await Team.deleteMany({});
    await League.deleteMany({});
    await User.deleteMany({});

    const leagues = await League.create([
      { name: 'Premier League', sport: 'football', country: 'England', season: '2025-2026' },
      { name: 'La Liga', sport: 'football', country: 'Spain', season: '2025-2026' },
      { name: 'NBA', sport: 'basketball', country: 'USA', season: '2025-2026' }
    ]);

    const teams = await Team.create([
      { name: 'Arsenal', league: 'Premier League', country: 'England', stadium: 'Emirates Stadium', wins: 15, draws: 3, losses: 2 },
      { name: 'Manchester City', league: 'Premier League', country: 'England', stadium: 'Etihad Stadium', wins: 14, draws: 4, losses: 2 },
      { name: 'Liverpool', league: 'Premier League', country: 'England', stadium: 'Anfield', wins: 13, draws: 5, losses: 2 },
      { name: 'Real Madrid', league: 'La Liga', country: 'Spain', stadium: 'Santiago Bernabeu', wins: 16, draws: 2, losses: 3 },
      { name: 'Barcelona', league: 'La Liga', country: 'Spain', stadium: 'Camp Nou', wins: 14, draws: 4, losses: 3 },
      { name: 'Lakers', league: 'NBA', country: 'USA', stadium: 'Crypto.com Arena', wins: 30, losses: 15 }
    ]);

    await Match.create([
      {
        homeTeam: 'Arsenal', awayTeam: 'Manchester City', league: 'Premier League', sport: 'football',
        startTime: new Date('2026-05-10T15:00:00'), status: 'upcoming', score: { home: 0, away: 0 }
      },
      {
        homeTeam: 'Liverpool', awayTeam: 'Arsenal', league: 'Premier League', sport: 'football',
        startTime: new Date('2026-05-07T19:00:00'), status: 'live', score: { home: 2, away: 1 }
      },
      {
        homeTeam: 'Real Madrid', awayTeam: 'Barcelona', league: 'La Liga', sport: 'football',
        startTime: new Date('2026-05-08T20:00:00'), status: 'upcoming', score: { home: 0, away: 0 }
      }
    ]);

    await Article.create([
      {
        title: 'Arsenal Stuns Manchester City in Title Race',
        content: 'Arsenal delivered a masterclass performance against Manchester City, winning 3-1 in a thrilling encounter at Emirates Stadium. Goals from Saka, Martinelli, and Odegaard secured all three points.',
        summary: 'Arsenal beat Manchester City 3-1 in a crucial Premier League title race match.',
        category: 'football', isFeatured: true, publishedAt: new Date('2026-05-07'), views: 1250
      },
      {
        title: 'Real Madrid Prepares for El Clasico',
        content: 'Real Madrid is gearing up for the biggest match of the season as they face Barcelona in El Clasico. Ancelotti\'s men are in fine form and will look to extend their lead at the top.',
        summary: 'Real Madrid ready for El Clasico against Barcelona this weekend.',
        category: 'football', isFeatured: true, publishedAt: new Date('2026-05-06'), views: 980
      },
      {
        title: 'Lakers on Winning Streak',
        content: 'The Los Angeles Lakers have won their last 8 games, with LeBron James and Anthony Davis leading the charge. Can they maintain this form into the playoffs?',
        summary: 'Lakers extend winning streak to 8 games behind stellar performances.',
        category: 'basketball', publishedAt: new Date('2026-05-05'), views: 750
      }
    ]);

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@bunasports.com',
      password: 'admin123',
      fullName: 'Admin User',
      role: 'admin',
      balance: 0
    });

    console.log('Seed data created successfully');
    console.log('Admin credentials: admin@bunasports.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
