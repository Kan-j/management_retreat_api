const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('vra_staff', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
  
const Staff = sequelize.define('Staff', {
  staffId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = {Staff, sequelize};
