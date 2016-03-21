// Update with your config settings.

require('dotenv').load();

module.exports = {

  // development: {
  //   client: 'pg',
  //   connection: 'postgres://localhost/shoveit'
  // },


  production: {
    client: 'pg',
    connection: {
      user: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
