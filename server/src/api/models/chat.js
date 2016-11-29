export default (sequelize, DataTypes) => {
  const Chat = sequelize.define('chat',
    {

    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
        },
      },
    }
  )
}
