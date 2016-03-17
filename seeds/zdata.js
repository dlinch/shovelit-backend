var knex = require('../db/knex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobinstance').del().then(function(){
    // Inserts seed entries
    return Promise.all([
      knex('jobinstance').insert({
        id: 1,
        creator_id: knex('users').where({id: 1}).select('id'),
        shoveler_id: knex('users').where({id: 2}).select('id'),
        time: '2004-10-19 10:23:54+02',
        job_id: knex('jobs').where({id: 1}).select('id'),
        job_amount: 10.50
      }),
      knex('jobinstance').insert({
        id: 2,
        creator_id: knex('users').where({id: 2}).select('id'),
        shoveler_id: knex('users').where({id: 3}).select('id'),
        time: '2004-10-19 10:23:54+02',
        job_id: knex('jobs').where({id: 2}).select('id'),
        job_amount: 15
      }),
      knex('jobinstance').insert({
        id: 3,
        creator_id: knex('users').where({id: 3}).select('id'),
        shoveler_id: knex('users').where({id: 2}).select('id'),
        time: '2004-10-19 10:23:54+02',
        job_id: knex('jobs').where({id: 3}).select('id'),
        job_amount: 50.40
      }),
    ])
  })
};
