var express = require('express')

var router = express.Router()
var userController = require('../controllers/userController')

router.get('/',function(req, res, next){
  res.send('index call')
  return
})

router.get('/users',userController.get_users)
router.post('/login',userController.login)

module.exports = router
