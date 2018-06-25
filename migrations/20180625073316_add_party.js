
exports.up = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
	    t.string('party');
	});
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('party');
    });
};
