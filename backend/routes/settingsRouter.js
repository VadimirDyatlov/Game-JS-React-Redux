const settingsRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Game, sequelize } = require('../db/models');

settingsRouter.route('/edituser')
  .post(async (req, res) => {
    try {
      const { userId } = req.session;
      const { name, password } = req.body;
      console.log(password, name);
      const user = await User.findOne({ where: { id: userId } });
      const existingUser = await User.findOne({ where: { name } });

      if (existingUser && existingUser.name !== user.name) {
        const message = 'Пользователь с таким именем уже существует!';
        res.status(409).json({ message });
        return;
      }

      if (password && password.length < 8) {
        console.log('---->', password.length < 8);
        res.status(401).json({ message: 'Длина пароля не верная!' });
        return;
      }

      if (name) {
        user.name = name;
      }
      if (password) {
        console.log('pass-->', password);
        user.password = await bcrypt.hash(password, 8);
      }
      user.save();
      console.log('save');
      res.status(200).json({ name: user.name });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

settingsRouter.route('/getPlayerStats')
  .get(async (req, res) => {
    try {
      const { userId } = req.session;
      const playerStats = await Game.findAll({
        where: { user_id: userId },
        raw: true,
        group: ['User.id'],
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('Game.id')), 'gamesPlayed'],
          [sequelize.fn('SUM', sequelize.col('killings')), 'killings'],
          [sequelize.fn('SUM', sequelize.col('Game.gold')), 'gold'],
          [sequelize.fn('SUM', sequelize.col('time')), 'time'],
        ],
        include: {
          raw: true,
          model: User,
          attributes: ['id'],
        },
      });
      console.log(playerStats);
      res.status(200).json({ playerStats });
    } catch (error) {
      console.log(error.message);
      res.status(502).json({ message: error.message });
    }
  });

module.exports = settingsRouter;
