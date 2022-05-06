// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');

/* Extension Functions */
const errorHandler = require('./api/errors');

/* Albums */
const songHandler = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');


/* Instantiaton of Postgres Services */
const albumsService = new AlbumsService();


const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: songHandler,
    options: {
      AlbumsService: albumsService,
      validator:  AlbumsValidator,
    },
  });

  await server.register({
    plugin: errorHandler,
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
