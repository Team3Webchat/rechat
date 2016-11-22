import Friendship from './friendship'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        allowNull: false,
      },
      email: { // TODO pg email validation
        type: DataTypes.STRING,
        unique: true,
        notEmpty: true,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      
    },
    {
      classMethods: {
        associate(models) {
          // models.User.belongsToMany(models.User, { as: 'Friends', through: models.Friendship})
          models.User.belongsToMany(models.User, 
            { 
              as: 'Friends', 
              through: models.Friendship,
            }
          )
        },
      },
      instanceMethods: {
        /**
         * Specialized query for getting a users friends. Using the generated getFriends() from
         * Sequelize returns only the users ADDED friends, not the one that added them. This ensures
         * Both friends that added you and friends that you added are returned from the database.
         * It saves us a row in the db for each friendship.
         */
        friends() {
          return sequelize.query(
            `SELECT "User"."id", "User"."email", "User"."firstname", 
            "User"."lastname", "User"."createdAt", "User"."updatedAt", 
            "Friendship"."accepted" AS "Friendship.accepted", 
            "Friendship"."createdAt" AS "Friendship.createdAt", 
            "Friendship"."updatedAt" AS "Friendship.updatedAt", 
            "Friendship"."UserId" AS "Friendship.UserId", "Friendship"."FriendId" AS 
            "Friendship.FriendId" FROM "Users" AS "User" 
            INNER JOIN "Friendships" AS 
            "Friendship" ON ("User"."id" = "Friendship"."FriendId" AND 
            "Friendship"."UserId" = :id) OR
            ("User"."id" = "Friendship"."UserId" AND "Friendship"."FriendId" = :id)
            `, 
            { replacements: { id: this.id }, type: sequelize.QueryTypes.SELECT })
            .catch(err => console.log(err))
        },
      },
    }
  )

  return User
}
