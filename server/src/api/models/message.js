export default function(sequelize, DataTypes) {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        models.Message.belongsToMany(models.ChatParticipant, {
          through: 'chatHistory',
          as: 'chatHistory',
        })

        models.Message.belongsTo(models.User, {
          as: 'author',
        })
      },
    },
  }
  
  )

  return Message
}