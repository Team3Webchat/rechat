'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Message = sequelize.define('message', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        models.Message.belongsToMany(models.ChatParticipant, {
          through: 'chatHistory',
          as: 'chatHistory'
        });

        models.Message.belongsTo(models.User, {
          as: 'user'
        });
      }
    }
  });

  return Message;
};