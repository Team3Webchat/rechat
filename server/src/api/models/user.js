import bcrypt from 'bcrypt'

export default function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true,

    },
    password: {
      type: DataTypes.STRING,
      min: 6,
    },
  })

  User.hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  }

  User.compareHash = password => {
    return bcrypt.compareSync(password, this.password)
  }
  return User
}
