'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Chat = sequelize.define('chat', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        models.Chat.belongsToMany(models.User, {
          through: 'chatParticipant',
          as: 'users'
        });

        models.Chat.hasMany(models.Message);
      }
    }
  });
  return Chat;
};