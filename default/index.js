const router = require('express').Router()
const postModel = require('../post/model.js')
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/home', (req, res, next) => {
  console.log(res.session);
  if (req.session._id != undefined) {
    postModel.find()
    .then((x) => {
      console.log(x);
      res.render('home',{
        posts:x
      })
    })
  } else {
    res.redirect('/')
  }
})
module.exports = router
