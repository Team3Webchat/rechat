import Sequelize from 'sequelize'

const databaseName = process.env.DB_NAME || 'replace_with_dbname'
const username = process.env.DB_USER || 'rechat'
const password = process.env.DB_PASS || 'password'

const sequelize = new Sequelize('d187376_rechat_dev', 'rechat', 'hej123', {
  host: 'https://www.db4free.net',
  dialect: 'mysql',
})

export function connectToDb() {
  return sequelize.connectToDb()
    .then(() => {
      console.log('Connected to the database!')
    })
    .catch(err => {
      console.log(err)
    }) 
}