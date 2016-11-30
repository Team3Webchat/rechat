export default function(sequelize, DataTypes) {
  const ChatParticipant = sequelize.define('chatParticipant',
    {

    },
    {
      classMethods: {
        associate(models) {
          models.ChatParticipant.belongsToMany(models.Message, 
            {
              through: 'chatHistory',
              as: 'chatHistory',    
            }
          )
        },
      },
    }
  )

  return ChatParticipant
}