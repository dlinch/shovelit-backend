
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments().primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('picture_url');
    table.boolean('shoveler');
    table.string('home_address');
  }).then(function(){
    return knex.schema.createTable('shovelers', function(table){
      table.increments().primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
    }).then(function(){
      return knex.schema.createTable('jobs', function(table){
        table.increments().primary();
        table.string('time');
        table.integer('requester_id').unsigned().references('id').inTable('users').onDelete('cascade');
        table.integer('shoveler_id').unsigned().references('id').inTable('shovelers').onDelete('cascade');
        table.boolean('complete');
        table.string('type');
        table.integer('zipcode');
        table.string('address');
      })
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs').then(function(){
    return knex.schema.dropTable('shovelers').then(function(){
      return knex.schema.dropTable('users');
    })
  })
};
