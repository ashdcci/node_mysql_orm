var Sequelize = require('sequelize');
var config      = require('config');
var connection = new Sequelize(config.get('dbConfig.dbname'), config.get('dbConfig.user'), config.get('dbConfig.password'), {
  host: config.get('dbConfig.host'),
  dialect: 'mysql',

  pool: {
    max: 30,
    min: 0,
    idle: 10000
  },
  define: {
        timestamps: false
    }

});

connection
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
global.Sequelize = Sequelize
module.exports = connection;
