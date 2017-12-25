
exports.up = function(knex, Promise) {
    return knex.schema.createTable('identities', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name').unique().notNull();
        t.timestamps(useTimestamps = true, defaultToNow = true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('identities');
};