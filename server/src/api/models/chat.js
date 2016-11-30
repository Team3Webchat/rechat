import models from '../models'
console.log(models)

export default function(sequelize, DataTypes) {
  const Chat = sequelize.define('chat', 
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        allowNull: false,
      },
    }, 
    {
      classMethods: {
        associate(models) {
          models.Chat.belongsToMany(models.User, {
            through: models.ChatParticipant, 
            as: 'users',
          })


        },
      },
      instanceMethods: {
        async getMessages() {
          console.log(this.chatParticipant)
          const messages = await this.chatParticipant.getChatHistory()
          return messages
        },

        async clearHistory() {
          const messages =  await this.chatParticipant.getChatHistory()
          messages.destroy()
        },
      },
    }
  )
  return Chat
}