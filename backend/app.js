require('dotenv').config();
const app = require('express')();
const config = require('./config/configApp');
// const { sequelize } = require('./db/models');

const authRouter = require('./routes/authRouter');
const gameRouter = require('./routes/gameRouter');
const heroRouter = require('./routes/heroRouter');
const settingsRouter = require('./routes/settingsRouter');
const statisticsRouter = require('./routes/statisticsRouter');

config(app);

app.use('/auth', authRouter);
app.use('/game', gameRouter);
app.use('/hero', heroRouter);
app.use('/settings', settingsRouter);
app.use('/statistics', statisticsRouter);

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, async () => {
  console.log(`Сервер успешно запущен на ${PORT}`);
  // try {
  //   await sequelize.authenticate();
  //   console.log('База данных успешно запущена');
  // } catch (error) {
  //   console.error('Ошибка базы данных', error);
  // }
});
