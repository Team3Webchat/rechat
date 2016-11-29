export default (sequelize, DataTypes) => {
  const Chat = sequelize.define('chat',
    {
      members: {
        //Array
        notEmpty: true,
        allowNull: false,
      }
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          models.Chat.belongsToMany(models.Chat,
            {
              as: 'messages',
              through: models.Message,
            }
          )
        },
      },
    }
  )
}
