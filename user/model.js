const mongoose = require('mongoose')
const user = new mongoose.Schema({
  regno: {
    type: String,
    unique: true
  },
  gender: {
    type: String,
    enum: [
      'Male',
      'Female'
    ]
  },
  password: String
})

const model = mongoose.model('user', user)

exports.newUser = (data) => {
  return new Promise(function(resolve, reject) {
    new model(data)
    .save((err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

exports.findOne = (query) => {
  return new Promise((resolve, reject) => {
    return model.findOne(query, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
