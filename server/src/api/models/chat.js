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
            through: 'chatUsers',
          })
        },
      },
    }
  )
  return Chat
}