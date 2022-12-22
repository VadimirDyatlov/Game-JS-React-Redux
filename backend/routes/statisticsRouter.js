const statisticsRouter = require('express').Router();

const { User, Game, sequelize } = require('../db/models');

// function statsObj(user, hero) {

// }

statisticsRouter.route('/getstats')
  .get(async (req, res) => {
    try {
      const statistics = await Game.findAll({
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
          attributes: ['id', 'name'],
        },
      });
      console.log(statistics);
      res.status(200).json({ statistics });
    } catch (error) {
      console.log(error);
      res.status(502).json({ masage: error.masage });
    }
  });

module.exports = statisticsRouter;
