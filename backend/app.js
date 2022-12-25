require('dotenv').config();
const app = require('express')();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const socket = require('socket.io');
// const server = require('http').Server(app);

// const io = socket(server);
const config = require('./config/configApp');
const { sequelize } = require('./db/models');

const authRouter = require('./routes/authRouter');
const gameRouter = require('./routes/gameRouter');
const upgradeRouter = require('./routes/upgradeRouter');
const settingsRouter = require('./routes/settingsRouter');
const statisticsRouter = require('./routes/statisticsRouter');

config(app);

app.use('/auth', authRouter);
app.use('/game', gameRouter);
app.use('/upgrade', upgradeRouter);
app.use('/settings', settingsRouter);
app.use('/statistics', statisticsRouter);

const PORT = process.env.PORT ?? 4000;

// io.on('connection', (user) => {
//   console.log('--->', user);
// });
io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(PORT, async () => {
  console.log(`Сервер успешно запущен на ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('База данных успешно запущена');
  } catch (error) {
    console.error('Ошибка базы данных', error);
  }
});
