
export default (sequelize, DataTypes) => sequelize.define('Friendship',
  {
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
  }, 
  {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  }
)