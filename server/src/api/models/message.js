export default (sequelize, DataTypes) => {
  const Message = sequelize.define('cessage',
    {
      message: {
        type: DataTypes.STRING,
      }
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          models.Message.hasOne(models.Message,
            {
              as: 'sentFrom',
              through: models.User,
            }
          )
        },
      },
    }
  )
}
