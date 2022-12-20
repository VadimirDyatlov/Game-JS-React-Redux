const heroRouter = require('express').Router();
const { User, Hero } = require('../db/models');

heroRouter.route('/getskills')
  .post(async (req, res) => {
    try {
      const { skills, gold } = req.body;
      const { userId } = req.session;
      const hero = await Hero.findOne({ where: { user_id: userId, type: skills.type } });
      hero.hp = skills.hp;
      hero.damage = skills.damage;
      hero.speed = skills.speed;
      hero.save();
      const user = await User.findOne({ where: { id: userId } });
      user.gold = gold;
      user.save();
      res.status(200).json({ masage: 'успех' });
    } catch (error) {
      console.log(error.masage);
      res.status(500).json({ masage: error.masage });
    }
  });

module.exports = heroRouter;
