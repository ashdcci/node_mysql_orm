
/**
 * Constructor declaration
 * @method
 * @return {null} [description]
 */
var user_model 			= function(){
  db = require('../config/db');
  User = db.define('user',{
        fname: Sequelize.STRING,
        lname: Sequelize.TEXT,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        access_token: Sequelize.STRING
      });
 };

/**
 * [constructor defination]
 */
user_model.prototype.constructor  	= user_model;

/**
 * Model Method declaration start here
 */

/**
 * @method getUsers
 * @param  {object}   data     [description]
 * @param  {Function} callback [description]
 * @return {function}            [description]
 */
user_model.prototype.getUsers = (data,callback) =>{

  User.findAll({attributes: ['id', 'fname', 'lname','email','created_at'],raw: true}).then(users => {
      callback(null, users);
  }).catch(err =>{
      callback(err, null);
  })
}


/**
 * @method signup
 * @param  {object}   data     [description]
 * @param  {Function} callback [description]
 * @return {function}            [description]
 */
user_model.prototype.signup = (data,callback) =>{
  User.findOrCreate({ attributes: ['id','email','access_token','created_at'],
                      where: {email: data.email,password:data.password},
                      defaults: {email: data.email,password:data.password,access_token: data.token}
                    })
      .spread((user, created) => { callback(null,created, user) })
}

/**
 * @method login
 * @param  {object}   data     [description]
 * @param  {Function} callback [description]
 * @return {function}            [description]
 */
user_model.prototype.login = (data,callback) =>{
  User.findOne({attributes: ['id','email','created_at'],where: {email: data.email,password:data.password}})
      .then((users) => callback(null,users))
      .catch(err => callback(err, null))
}

/**
 * @method updateToken
 * @param  {object}   data     [description]
 * @param  {Function} callback [description]
 * @return {function}            [description]
 */
user_model.prototype.updateToken = (data,callback) => {
    User.update({access_token: data.token},{where:{email:data.email} });
}


module.exports = new user_model();
