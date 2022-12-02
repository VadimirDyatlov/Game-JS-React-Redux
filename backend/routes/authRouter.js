const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
// const checkAvatar = require('../../models/checkAvatar');

function authUser(user) {
  return {
    id: user.id,
    name: user.name,
    money: user.money,
  };
}

authRouter.route('/reg')
  .post(async (req, res) => {
    const {
      name, password, password2,
    } = req.body;
    if (password !== password2 || password.length < 8) {
      const message = 'пароль не совпадает или его длина не верная';
      res.status(401).json({ message });
      return;
    }
    const existingName = await User.findOne({ where: { name } });
    if (existingName) {
      const message = 'Пользователь с таким логином или почтовым адресом уже существует';
      res.status(409).json({ message });
      return;
    }
    const user = await User.create({
      name,
      password: await bcrypt.hash(password, 8),
      avatar: '123',
    });
    req.session.userId = user.id;
    res.status(200).json(authUser(user));
  });

authRouter.route('/log')
  .post(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && await bcrypt.compare(password, existingUser.password)) {
      req.session.userId = existingUser.id;
      res.status(200).json({ message: 'ok' });
      return;
    }
    const message = 'Неверный логин или пароль';
    res.status(500).json({ err: 1, message });
  });

module.exports = authRouter;
