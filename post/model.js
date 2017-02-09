const mongoose = require('mongoose')
const post = new mongoose.Schema({
  regno:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  branch: String,
  requirements: String,
  presentRoomNo: String,
  gender: String,
  group: String
})

const model = mongoose.model('post', post)

exports.newPost = (data) => {
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

exports.find = (query) => {
  return new Promise(function(resolve, reject) {
    model.find(query, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
