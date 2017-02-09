const router = require('express').Router()
const model = require('./model.js')
router.post('/', (req, res, next) => {
  if (req.session._id != undefined) {
    let data = {
      regno: req.body.regno,
      branch: req.body.branch,
      requirements: req.body.requirements,
      presentRoomNo: req.body.presentRoomNo,
      gender: req.session.gender,
      group:req.body.group
    }
    model.newPost(data)
    .then((x) => {
      res.redirect('/home?sucess=true')
    })
  } else {
    res.redirect('/')
  }
})

module.exports = router
