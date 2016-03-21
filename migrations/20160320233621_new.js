
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments().primary();
    table.string('profile_id')
    table.boolean('shoveler');
    table.string('home_address');
    table.integer('zipcode')
  }).then(function(){
      return knex.schema.createTable('jobs', function(table){
        table.increments().primary();
        table.string('time');
        table.integer('requester_id').unsigned().references('id').inTable('users').onDelete('cascade');
        table.integer('shoveler_id').unsigned().references('id').inTable('users').onDelete('cascade');
        table.boolean('complete');
        table.string('type');
        table.integer('zipcode');
        table.string('address');
      })
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs').then(function(){
    return knex.schema.dropTable('users');
  })
};
