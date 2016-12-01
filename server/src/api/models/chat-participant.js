export default function(sequelize, DataTypes) {
  const ChatParticipant = sequelize.define('chatParticipant',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        allowNull: false,
      },
    },
  )

  return ChatParticipant
}