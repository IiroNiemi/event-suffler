const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser");

const yaml = require('js-yaml');
const fs = require('fs');
const swaggerSpec = yaml.safeLoad(fs.readFileSync('swagger.yaml', 'utf8'));

const connectionString = process.env.POSTGRES_URI;
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(connectionString,{ define: {
  freezeTableName: true  // no automatic pluralization of the model name
}});

exports.dbcheck = () => {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

exports.createdbModels = () => {
  const { Event, Vote } = require('./models/index');
  Event.hasMany(Vote)
  Vote.belongsTo(Event)
  sequelize.sync();
}

exports.initExpress = () => {
  const PORT = 3000;
  const app = express();
  const mountRoutes = require('./routes');

  app.use(bodyParser.json());

  mountRoutes(app);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.listen(PORT);
  console.log(`Running on http://localhost:${PORT}`);  
}

exports.sequelize = sequelize;