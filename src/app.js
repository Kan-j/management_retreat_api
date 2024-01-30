// app.js

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
const cors = require('cors')
 const {sequelize} = new require('./models/Staff')

const app = express();

app.use(cors({
  origin: '*' // Allow requests from any origin
}));

app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;



// Connect to the database
sequelize
  .authenticate()
  .then(() => {
      console.log('Database connection has been established successfully.');
      sequelize.sync();
    // insertStaff();
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
      sequelize
  }