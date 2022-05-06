const AlbumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'openMusic API - Albums',
  version: '1.0.0',
  register: async (server, { AlbumsService, SongsService, validator }) => {
    const albumsHandler = new AlbumsHandler(AlbumsService, SongsService, validator);
    server.route(routes(albumsHandler));
  },
};
