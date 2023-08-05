const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },    email: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    accounttype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }


}, {
  timestamps: false // timestamps 옵션을 false로 설정
});
  return User;
};
