import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const databaseUrl = process.env.DB_URL || 'postgres://hvceryny:h1qEbp_GdSk33ArYSIk0c5EFvNRvv8vG@horton.elephantsql.com:5432/hvceryny'

export const sequelize = new Sequelize(databaseUrl)

const models = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model
  })

Object.keys(models).forEach(model => {
  if ('associate' in models[model]) {
    models[model].associate(models)
  }
})

export default models
