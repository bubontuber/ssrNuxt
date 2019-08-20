const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const postRoutes = require('./routes/post.routes')
const authRoutes = require('./routes/auth.routes')
const commentRoutes = require('./routes/comments.routes')
// eslint-disable-next-line no-unused-vars
const keys = require('./keys')
const app = express()

const uri = 'mongodb+srv://admin:Ro740602!@cluster0-y0wsw.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri)
  .then(() => {
    console.log('connected')
  })
  .catch((er) => {
    console.log(er)
  })

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comments', commentRoutes)

module.exports = app
