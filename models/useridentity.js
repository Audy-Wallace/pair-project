'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIdentity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserIdentity.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  UserIdentity.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserIdentity',
  });
  return UserIdentity;
};