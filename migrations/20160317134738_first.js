
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.createTable('users', function(table){
    table.increments().primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.boolean('pro');
    table.string('token');
  }),
  knex.schema.createTable('jobs', function(table){
    table.increments().primary();
    table.string('address');
    table.string('type');
  })
]).then(function(){
  return knex.schema.createTable('jobinstance', function(table){
    table.increments().primary();
    table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('cascade');
    table.integer('shoveler_id').unsigned().references('id').inTable('users').onDelete('cascade');
    table.string('time');
    table.integer('job_id').unsigned().references('id').inTable('jobs').onDelete('cascade');
    table.decimal('job_amount');
  })
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobinstance').then(function(){
    return Promise.all([
      knex.schema.dropTable('jobs'),
      knex.schema.dropTable('users')
    ])
  })
};
