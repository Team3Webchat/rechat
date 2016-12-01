export default function(sequelize, DataTypes) {
  const Message = sequelize.define('message', 
    {
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
    }, 
    {
      classMethods: {
        associate(models) {
          models.Message.belongsTo(models.User, {
            as: 'user',
          })
        },
      },
      instanceMethods: {
        async author() {
          const user = await this.getUser()
          return user.fullname()
        },
      },
    }  
  )

  return Message
}