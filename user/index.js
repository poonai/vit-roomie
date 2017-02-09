const router = require('express').Router()
const model = require('./model.js')
const crypto = require('crypto')
router.post('/', (req, res, next) => {
  let sha = crypto.createHmac('sha512', process.env.SECRET)
  let user = {
    regno: req.body.regno,
    gender: req.body.gender,
    password: sha.update(req.body.password).digest('hex')
  }
  console.log(user);
  model.newUser(user).
  then((x) => {
    res.redirect('/?register=true')
  })
  .catch((x) => {
    res.redirect('/?register=false')
  })
})
router.post('/login', (req, res, next) => {
  let query = {
    regno: req.body.regno
  }
  let sha = crypto.createHmac('sha512', process.env.SECRET)
  let password = sha.update(req.body.password).digest('hex')
  model.findOne(query)
  .then((x) => {
    console.log(x);
    if (x.password == password) {
      req.session._id = x._id
      req.session.regno = x.regno
      req.session.gender = x.gender
      res.redirect('/home')
    } else {
      res.redirect('/?auth=false')
    }
  })
  .catch((x) => {
    res.send('something went wrong')
  })
})
module.exports = router
