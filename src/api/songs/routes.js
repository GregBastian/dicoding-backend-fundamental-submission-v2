const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getAllSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/albums/{id}',
  //   handler: handler.getAlbumHandler,
  // },
  // {
  //   method: 'PUT',
  //   path: '/albums/{id}',
  //   handler: handler.putAlbumHandler,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/albums/{id}',
  //   handler: handler.deleteAlbumHandler,
  // },
];

module.exports = routes;
