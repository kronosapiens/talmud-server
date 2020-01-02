module.exports = {

  development: {
    client: 'pg',
    connection: `postgresql://kronosapiens@localhost:5432/talmud_dev`,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: `postgresql://kronosapiens@localhost:5432/talmud_test`,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: `postgresql://kronosapiens@localhost:5432/talmud_prod`,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
