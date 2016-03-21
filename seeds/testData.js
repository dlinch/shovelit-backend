 var knex = require('../db/knex');

 exports.seed = function(knex, Promise) {
   // Deletes ALL existing entries
   return knex('users').del().then(function(){
     // Inserts seed entries
     return Promise.all([
       knex('users').insert({
         first_name: 'Derik',
         last_name: 'Linch',
         email: 'dlinch33@gmail.com',
         password: 'password',
         picture_url: 'www.google.com/',
         shoveler: true,
         home_address: '8570 West 95th Drive Westminster CO 80021'
         }),
       knex('users').insert({
         first_name: 'Bryce',
         last_name: 'Linch',
         email: 'bmlinch@gmail.com',
         password: 'password',
         picture_url: 'www.google.com/',
         shoveler: false,
         home_address: '8570 West 95th Drive Westminster CO 80021'
         }),
       knex('users').insert({
         first_name: 'David',
         last_name: 'Shibley',
         email: 'shibbles@gmail.com',
         password: 'password',
         picture_url: 'www.google.com/',
         shoveler: true,
         home_address: '1644 Platte Street Denver CO'
         }),
     ]);
   });
  };
