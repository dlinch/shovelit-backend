var knex = require('../db/knex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del().then(function(){
    // Inserts seed entries
    return Promise.all([
      knex('jobInstance').insert({
        id: 2,
        creator_id: 1,
        shoveler_id: 2,
        time: '2004-10-19 10:23:54+02',
        job_id: 1,
        job_amount: 10.50
      }),
      knex('jobInstance').insert({
        id: 1,
        creator_id: 2,
        shoveler_id: 3,
        time: '2004-10-19 10:23:54+02',
        job_id: 2,
        job_amount: 15
      }),
      knex('jobInstance').insert({
        id: 3,
        creator_id: 3,
        shoveler_id: 2,
        time: '2004-10-19 10:23:54+02',
        job_id: 3,
        job_amount: 50.40
      }),
    ])
  })
};
