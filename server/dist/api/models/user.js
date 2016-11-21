'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    },
    email: { // TODO pg email validation
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    }
  });
};