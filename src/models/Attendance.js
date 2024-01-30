// models/Attendance.js

const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('./Staff')
  
const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Attendance;
