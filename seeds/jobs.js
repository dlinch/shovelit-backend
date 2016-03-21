var knex = require('../db/knex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del().then(function(){
    // Inserts seed entries
    return Promise.all([
      knex('jobs').insert({
        address: '8570 West 95th Drive Westminster CO 80021',
        type: 'house'
      }),
      knex('jobs').insert({
        address: '1784 Sapling Court Castle Rock CO 80109',
        type: 'house',
      }),
      knex('jobs').insert({
        address: '8121 W 94th Ave, Westminster, CO 80021',
        type: 'business',
      }),
    ])
  })
 };
