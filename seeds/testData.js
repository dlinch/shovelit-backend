var knex = require('../db/knex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(function(){
    // Inserts seed entries
    return Promise.all([
      knex('users').insert({
        id: 1,
        first_name: 'Derik',
        last_name: 'Linch',
        email: 'dlinch33@gmail.com',
        pro: false,
        token: 'password1'
        }),
      knex('users').insert({
        id: 2,
        first_name: 'Ashley',
        last_name: 'Lauren',
        email: 'dlinch33@gmail.com',
        pro: true,
        token: 'password2'
        }),
      knex('users').insert({
        id: 3,
        first_name: 'Bryce',
        last_name: 'Linch',
        email: 'bmlinch@gmail.com',
        pro: false,
        token: 'password3'
      }),
    ])
  })
 };
