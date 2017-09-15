var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router()
var userController = require('../controllers/userController')
var users = require('../models/user_model')

passport.initialize()
passport.use(new LocalStrategy(function(email, password, done) {
  users.authenticate(email,password,done)
}))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  users.deserializeUser(id,cb)
});

router.get('/',function(req, res, next){
  res.send('index call')
  return
})






router.get('/users',userController.get_users)
router.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),userController.login)
// router.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//
//     res.json(req.body);
//   });
router.get('/test',userController.testview)
router.get('/login',(req, res, next)=>{
  res.status(400).json({'status':0,'msg':'bad request'})
})

module.exports = router
