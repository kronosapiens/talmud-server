
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
        t.string('email').unique().notNull();
        t.string('password').notNull();
        t.string('cc').notNull();
        t.string('zip');
        t.string('gender');
        t.string('religion');
        t.string('ethnicity');
        t.string('job');
        t.integer('age');
        t.integer('income');
        t.timestamps(useTimestamps = true, defaultToNow = true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
