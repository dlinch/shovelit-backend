var knex = require('../db/knex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobinstance').del().then(function(){
    // Inserts seed entries
    return Promise.all([
      knex('jobinstance').insert({
        creator_id: knex('users').where({first_name: 'Derik'}).select('id'),
        shoveler_id: knex('users').where({first_name: 'Ashley'}).select('id'),
        time: 'Fri Mar 18 2016 12:30:58 GMT-0600 (MDT)',
        job_id: knex('jobs').where({id: 1}).select('id'),
        job_amount: 10.50
      }),
      knex('jobinstance').insert({
        creator_id: knex('users').where({first_name: 'Ashley'}).select('id'),
        shoveler_id: knex('users').where({first_name: 'Bryce'}).select('id'),
        time: 'Fri Mar 18 2016 12:30:58 GMT-0600 (MDT)',
        job_id: knex('jobs').where({id: 2}).select('id'),
        job_amount: 15
      }),
      knex('jobinstance').insert({
        creator_id: knex('users').where({first_name: 'Bryce'}).select('id'),
        shoveler_id: knex('users').where({first_name: 'Ashley'}).select('id'),
        time: 'Fri Mar 18 2016 12:30:58 GMT-0600 (MDT)',
        job_id: knex('jobs').where({id: 3}).select('id'),
        job_amount: 50.40
      }),
    ])
  })
};
