const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  imgUrl: {
    type: String
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ]
})

module.exports = model('Posts', postSchema)
