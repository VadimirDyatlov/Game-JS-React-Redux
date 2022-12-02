const gameRouter = require('express').Router();

gameRouter.route('/')
  .get((req, res) => {
    console.log(123);
    const str = 'lalala';
    res.json({ str });
  });

module.exports = gameRouter;
