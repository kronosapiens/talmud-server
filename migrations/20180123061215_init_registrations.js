
exports.up = function(knex, Promise) {
    return knex.schema.createTable('registrations', function(t) {
        t.increments('id').unsigned().primary();
        t.timestamps(useTimestamps = true, defaultToNow = true);
        t.string('register_code').unique().notNull();
        t.string('confirm_code').unique().notNull();
        t.integer('parent_id').references('id');
        t.integer('user_id').references('users.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('registrations');
};
