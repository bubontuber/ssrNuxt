const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const condidate = await User.findOne({ login: req.body.login })
  if (condidate) {
    const isPassCorrect = bcrypt.compareSync(req.body.password, condidate.password)

    if (isPassCorrect) {
      const token = jwt.sign({
        login: condidate.login,
        userId: condidate._id
      }, keys.JWT, { expiresIn: 60 * 60 })
      res.json({ token })
    } else {
      res.status(401).json({ message: 'Pass incorrect' })
    }
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

module.exports.createUser = async (req, res) => {
  const condidate = await User.findOne({ login: req.body.login })

  if (condidate) {
    res.status(409).json({ message: 'This login is already used' })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })

    await user.save()
    res.status(201).json(user)
  }
}
