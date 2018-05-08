module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://kronosapiens@localhost:5432/talmud_dev',
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgresql://kronosapiens@localhost:5432/talmud_test',
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
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
