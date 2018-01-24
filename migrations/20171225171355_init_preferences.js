
exports.up = function(knex, Promise) {
    return knex.schema.createTable('preferences', function(t) {
        t.increments('id').unsigned().primary();
        t.timestamps(useTimestamps = true, defaultToNow = true);
        t.integer('user_id').references('users.id').notNull();
        t.integer('alpha_id').notNull();
        t.integer('beta_id').notNull();
        t.integer('win_bit').notNull(); // 0 for a, 1 for b
        t.unique(['user_id', 'alpha_id', 'beta_id']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('preferences');
};
