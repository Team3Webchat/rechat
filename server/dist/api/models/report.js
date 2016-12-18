'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Report = sequelize.define('report', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        models.Report.belongsTo(models.User);
      }
    }
  });
  return Report;
};