
exports.up = function(knex, Promise) {
  return knex.schema.table('jobs', function(table){
    table.boolean('paid').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('jobs', function(table){
    table.dropColumn('paid');
  })
};
