 var knex = require('../db/knex');

 exports.seed = function(knex, Promise) {
   // Deletes ALL existing entries
   return knex('users').del().then(function(){
     // Inserts seed entries
     return Promise.all([
       knex('users').insert({
         profile_id: null,
         shoveler: true,
         home_address: '8570 West 95th Drive Westminster CO',
         zipcode: 80021
         }),
       knex('users').insert({
         profile_id: null,
         shoveler: false,
         home_address: '1644 Platte Street',
         zipcode: 80202
         }),
       knex('users').insert({
         profile_id: null,
         shoveler: true,
         home_address: '2911 Walnut Street Denver',
         zipcode: 80205
         }),
     ]);
   });
  };
