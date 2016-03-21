var knex = require('../db/knex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shovelers').del().then(function(){
    // Inserts seed entries
    return Promise.all([
      knex('shovelers').insert({
        user_id: knex('users').where({first_name: 'Derik'}).select('id')
        }),
      knex('shovelers').insert({
        user_id: knex('users').where({first_name: 'David'}).select('id')
        }),
    ])
  })
 }
