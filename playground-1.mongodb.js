use('buna-sports');

db.users.insertOne({
  username: 'admin',
  email: 'admin@bunasports.com',
  password: '$2a$12$ZGd0tcjloSvkL/CTW0ncYOkN4sRhprpuqduw3XFBxwWLKr.RHWDJW',
  fullName: 'System Admin',
  role: 'admin',
  balance: 0,
  isActive: true,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
