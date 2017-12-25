
exports.up = function(knex, Promise) {
    return knex.schema.createTable('preferences', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('a_id').references('identities.id').notNull();
        t.integer('b_id').references('identities.id').notNull();
        t.integer('winner').notNull(); // 0 for a, 1 for b
        t.timestamps(useTimestamps = true, defaultToNow = true);
        t.unique(['a_id', 'b_id']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('preferences');
};