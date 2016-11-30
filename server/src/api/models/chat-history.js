export default function(sequelize, DataTypes) {
  const ChatHistory = sequelize.define('chatHistory',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },   
    }
  )

  return ChatHistory
}