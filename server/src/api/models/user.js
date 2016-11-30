import Friendship from './friendship'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user',
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
      getterMethods: {
        fullname() {
          return `${this.firstname} ${this.lastname}`
        },
      },

      classMethods: {
        associate(models) {
          // models.User.belongsToMany(models.User, { as: 'Friends', through: models.Friendship})
          models.User.belongsToMany(models.User,
            {
              as: 'friends',
              through: models.Friendship,
            }
          )
          models.User.belongsToMany(models.Chat, {
            through: models.ChatParticipant,
            as: 'chats',
          })

          models.User.hasMany(models.Message)
        },
      },
      instanceMethods: {
        /**
         * Specialized query for getting a users friends. Using the generated getFriends() from
         * Sequelize returns only the users ADDED friends, not the one that added them. This ensures
         * Both friends that added you and friends that you added are returned from the database.
         * It saves us a row in the db for each friendship.
         */
        friendships() {
          return sequelize.query(
            `SELECT "user"."id", "user"."email", "user"."firstname",
            "user"."lastname", "user"."createdAt", "user"."updatedAt",
            "friendship"."accepted" AS "friendship.accepted",
            "friendship"."createdAt" AS "friendship.createdAt",
            "friendship"."updatedAt" AS "friendship.updatedAt",
            "friendship"."userId" AS "friendship.senderId", "friendship"."friendId" AS
            "friendship.receiverId" FROM "users" AS "user"
            INNER JOIN "friendships" AS
            "friendship" ON ("user"."id" = "friendship"."friendId" AND
            "friendship"."userId" = :id) OR
            ("user"."id" = "friendship"."userId" AND "friendship"."friendId" = :id)
            `,
            { replacements: { id: this.id }, type: sequelize.QueryTypes.SELECT })
            .catch(err => new Error('Database error'))
        },

        friends() {
          return this.friendships()
            .then(friends => friends.filter(f => f['friendship.accepted']))
        },

        friendRequests() {
          return this.friendships()
            .then(friends => friends.filter(f => !f['friendship.accepted'] && f['friendship.receiverId'] === this.id))
        },

        sentFriendRequests() {
          return this.friendships()
            .then(friends => friends.filter(f => !f['friendship.accepted'] && f['friendship.senderId'] === this.id)) 
        },


      },
    }
  )

  return User
}
