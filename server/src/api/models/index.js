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
    console.log('Model name: ', model)
    models[model.name] = model
  })

Object.keys(models).forEach(model => {
  if ('associate' in models[model]) {
    models[model].associate(models)
  }
})

console.log(models)


export default models
export { sequelize, Sequelize }
