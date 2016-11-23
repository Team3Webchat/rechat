import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import db from '../../config/db'

const env = process.env.NODE_ENV || 'development'
const { database, username, password, host, dialect } = db[env]

const sequelize = new Sequelize(
  database, 
  username, 
  password, 
  {
    host,
    dialect,
  }
)

const models = {}

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model
  })

Object.keys(models).forEach(model => {
  if ('associate' in models[model]) {
    models[model].associate(models)
  }
})

// models.User.findOne({where: { email: 'user@test.com'}})
//   .then(d => {
//     models.User.findOne({
//       where: { email: 'alexdriagin12@gmail.com' },
//     })
//     .then(a => {
//       d.addFriend(a)
//         .then(() => {
          
//         })          
//     })
//   })

// models.User.findOne({where:{email:'user@test.com'}})
//   .then(u => {
//     return u.friends()
//   })
//   .then(friends => {
//     console.log()
//     console.log()
//     console.log("____________USERS FRIENDS________")
//     console.log(friends)
//   })

// models.Friendship.findAll()
//   .then(f => {
//     f.forEach(friend => {
//       friend.update({ accepted: false })
//     })
//   })




export default models
export { sequelize, Sequelize }
