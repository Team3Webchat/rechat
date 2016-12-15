export default (sequelize, DataTypes) => {
  const Report = sequelize.define('report',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        notEmpty: true,
      },
    },
    {
      classMethods: {
        associate(models) {
          models.Report.belongsTo(models.User)
        },
      },
    }
  )
  return Report
}
