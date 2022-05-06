// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');

/* Extension Functions */
const errorHandler = require('./api/errors');

/* Albums */
const albumHandler = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');

/* Songs */
const songHandler = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');

/* Instantiaton of Postgres Services */
const albumsService = new AlbumsService();
const songsService = new SongsService();

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
    plugin: albumHandler,
    options: {
      AlbumsService: albumsService,
      SongsService: songsService,
      validator: AlbumsValidator,
    },
  });

  await server.register({
    plugin: songHandler,
    options: {
      SongsService: songsService,
      validator: SongsValidator,
    },
  });

  await server.register({
    plugin: errorHandler,
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
