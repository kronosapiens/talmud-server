
exports.up = function(knex, Promise) {
    return knex.schema.createTable('preferences', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('user_id').references('users.id').notNull();
        t.integer('alpha_id').references('identities.id').notNull();
        t.integer('beta_id').references('identities.id').notNull();
        t.integer('win_bit').notNull(); // 0 for a, 1 for b
        t.timestamps(useTimestamps = true, defaultToNow = true);
        t.unique(['user_id', 'alpha_id', 'beta_id']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('preferences');
};
