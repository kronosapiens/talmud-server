require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : process.env.RDS_HOSTNAME,
      port : process.env.RDS_PORT,
      user : process.env.RDS_USERNAME,
      password : process.env.RDS_PASSWORD,
      database : process.env.RDS_DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
