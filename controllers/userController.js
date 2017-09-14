function userController(){
  tomodel = {}
  user_model = require('../models/user_model')
  crypto = require('crypto')
  jwt =  require('jsonwebtoken')
  superSecret = 'b1N3xXrpwNPrsLZH2GmCa95TbuU6hvvKQYVDcKSKrg4PfiOCm_X8A5G_hpLvTmD_'
  exp_time = Math.floor(Date.now() / 1000) + (3600 * 3600)
  token_data = Math.floor((Math.random() * 1000000000) + 1).toString()
};


userController.constructor = userController

userController.prototype.get_users = (req, res, next) =>{
  user_model.getUsers(tomodel,(err, rows) =>{
    if(err){
      return res.json({'status':0,'data':err,'msg':'err in data parse'})
    }
    return res.json({'status':1,'data':rows})
  });
  return
}


userController.prototype.login = (req, res, next) =>{
    /**
     * route
     * 1. if 0 then login
     * 2. if 1 then signup
     *
     */
    if(!req.body.email || !req.body.password){
      return res.status(400).json({'status':0,'msg':'not to authorise api call'})
    }

    /**
     * variable declaration
     */
    login_chk = (typeof req.body.check !== 'undefined' && req.body.check == 1) ? 1 : 0
    tomodel.email = (typeof req.body.email !== 'undefined') ? req.body.email : ''
    tomodel.password = (typeof req.body.password !== 'undefined') ? crypto.createHash("md5").update(req.body.password).digest('hex') : ''
    var exp_time = Math.floor(Date.now() / 1000) + (3600 * 3600);
    tomodel.token = jwt.sign({
								  exp: exp_time,
								  data: token_data
								}, superSecret);
    if(login_chk == 1){
      // signup

      /**
       * signup called from model
       */
      user_model.signup(tomodel,(err, check, rows) =>{
          if(err)
             return res.status(500).json({'status':0,'msg':'err in data parse'})
          if(check == false)
             return res.json({'status':2,'msg':'User already exists','data':rows})
           res.json({'status':1,'msg':'user created successfully','data':rows})
      })

    }else{
      // login

      /**
       * login method called from model
       */
      user_model.login(tomodel,(err, rows) =>{
          if(err)
             res.status(500).json({'status':0,'msg':'err in data parse'})
             user_model.updateToken(tomodel,(err1, rows1)=>{})
             rows.access_token = tomodel.token
          res.json({'status':rows ? 1 : 0,'msg':rows ? 'login successfully' : 'login failed' ,'data':rows ? rows : {}})

      })
    }
    return
}

module.exports = new userController();
