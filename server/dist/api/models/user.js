'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _friendship = require('./friendship');

var _friendship2 = _interopRequireDefault(_friendship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    },
    email: { // TODO pg email validation
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    }

  }, {
    // getterMethods: {
    //   fullname() {
    //     return `${this.firstname} ${this.lastname}`
    //   },
    // },

    classMethods: {
      associate: function associate(models) {
        // models.User.belongsToMany(models.User, { as: 'Friends', through: models.Friendship})
        models.User.belongsToMany(models.User, {
          as: 'friends',
          through: models.Friendship
        });
        models.User.belongsToMany(models.Chat, {
          through: models.ChatParticipant,
          as: 'chats'
        });

        models.User.hasMany(models.Message);
      }
    },
    instanceMethods: {
      fullname: function fullname() {
        return this.firstname + ' ' + this.lastname;
      },

      /**
       * Specialized query for getting a users friends. Using the generated getFriends() from
       * Sequelize returns only the users ADDED friends, not the one that added them. This ensures
       * Both friends that added you and friends that you added are returned from the database.
       * It saves us a row in the db for each friendship.
       */

      friendships: function friendships() {
        return sequelize.query('SELECT "user"."id", "user"."email", "user"."firstname",\n            "user"."lastname", "user"."createdAt", "user"."updatedAt",\n            "friendship"."accepted" AS "friendship.accepted",\n            "friendship"."createdAt" AS "friendship.createdAt",\n            "friendship"."updatedAt" AS "friendship.updatedAt",\n            "friendship"."userId" AS "friendship.senderId", "friendship"."friendId" AS\n            "friendship.receiverId" FROM "users" AS "user"\n            INNER JOIN "friendships" AS\n            "friendship" ON ("user"."id" = "friendship"."friendId" AND\n            "friendship"."userId" = :id) OR\n            ("user"."id" = "friendship"."userId" AND "friendship"."friendId" = :id)\n            ', { replacements: { id: this.id }, type: sequelize.QueryTypes.SELECT }).catch(function (err) {
          return new Error('Database error');
        });
      },
      friends: function friends() {
        return this.friendships().then(function (friends) {
          return friends.filter(function (f) {
            return f['friendship.accepted'];
          });
        });
      },
      friendRequests: function friendRequests() {
        var _this = this;

        return this.friendships().then(function (friends) {
          return friends.filter(function (f) {
            return !f['friendship.accepted'] && f['friendship.receiverId'] === _this.id;
          });
        });
      },
      sentFriendRequests: function sentFriendRequests() {
        var _this2 = this;

        return this.friendships().then(function (friends) {
          return friends.filter(function (f) {
            return !f['friendship.accepted'] && f['friendship.senderId'] === _this2.id;
          });
        });
      }
    }
  });

  return User;
};