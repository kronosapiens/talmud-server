
exports.up = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
	    t.string('relationship');
	    t.string('siblings');
	    t.string('children');
	});
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('relationship');
        t.dropColumn('siblings');
        t.dropColumn('children');
    });
};
