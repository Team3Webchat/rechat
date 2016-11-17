module.exports = {
  'development': {
    'username': 'rechatdevdb',
    'password': 'rechatdevdb',
    'database': 'rechatdevdb',
    'host': '188.166.121.53',
    'dialect': 'postgres',
  },
  'production': {
    'username': process.env.DB_USER || 'rechatdevdb',
    'password': process.env.DB_PW || 'rechatdevdb',
    'database': process.env.DB_NAME || 'rechatdevdb',
    'host': process.env.DB_HOST || '188.166.121.53',
    'dialect': 'postgres',
  }
}