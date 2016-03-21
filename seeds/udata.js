var knex = require('../db/knex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del().then(function(){
    // Inserts seed entries
    return Promise.all([
      knex('jobs').insert({
        time: Date(),
        requester_id: knex('users').where({id: 1}).select('id'),
        shoveler_id: knex('users').where({id: 2}).select('id'),
        complete: false,
        type: 'house',
        address: knex('users').where({id: 1}).select('home_address'),
        zipcode: knex('users').where({id: 1}).select('zipcode'),
        }),
      knex('jobs').insert({
        time: Date(),
        requester_id: knex('users').where({id: 2}).select('id'),
        shoveler_id: knex('users').where({id: 1}).select('id'),
        complete: false,
        type: 'house',
        address: knex('users').where({id: 2}).select('home_address'),
        zipcode: knex('users').where({id: 2}).select('zipcode'),
        }),
    ])
  })
 }
