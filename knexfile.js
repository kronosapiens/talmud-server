module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://krono@localhost:5432/krono'
  },

  production: {
    client: 'pg',
    connection: 'postgresql://krono@localhost:5432/krono',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
