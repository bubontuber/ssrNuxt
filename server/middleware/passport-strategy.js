const { Strategy, ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')
const User = require('../models/user.model')
const keys = require('../keys/keys.dev')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const condidate = await User.findById(payload.userId).select('id')
    if (condidate) {
      done(null, condidate)
    } else {
      done(null, false)
    }
  } catch (e) {
    throw e
  }
})
