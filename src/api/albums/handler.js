const { successResponse } = require('../../utils/responses');
const autoBind = require('auto-bind');


class AlbumsHandler {
  constructor(albumsService, validator) {
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h){
    this._validator.validatePostAlbumPayload(request);

    const newAlbumId = await this._albumsService.addAlbum(request);

    return successResponse(h, {
      responseMessage: 'Album berhasil ditambahkan!',
      responseData: { albumId: newAlbumId },
      responseCode: 201
    });
  }

  // async postSongHandler(request, h) {
  //   this._validator.validateSongPayload(request.payload);

  //   const newSongId = await this._service.addSong(request.payload);

  //   return successResponse(h, {
  //     withMessage: true,
  //     withData: true,
  //     responseMessage: 'Lagu berhasil ditambahkan',
  //     responseData: { songId: newSongId },
  //     responseCode: 201,
  //   });
  // }

  // async getSongsHandler(request, h) {
  //   const retrievedSongs = await this._service.getSongs();
  //   return successResponse(h, {
  //     withData: true,
  //     responseData: { songs: retrievedSongs },
  //   });
  // }

  // async getSongByIdHandler(request, h) {
  //   const { id } = request.params;
  //   const retrievedSong = await this._service.getSongById(id);
  //   return successResponse(h, {
  //     withData: true,
  //     responseData: { song: retrievedSong },
  //   });
  // }

  // async putSongByIdHandler(request, h) {
  //   this._validator.validateSongPayload(request.payload);
  //   const { id } = request.params;

  //   await this._service.editSongById(id, request.payload);

  //   return successResponse(h, {
  //     withMessage: true,
  //     responseMessage: 'lagu berhasil diperbarui',
  //   });
  // }

  // async deleteSongByIdHandler(request, h) {
  //   const { id } = request.params;
  //   await this._service.deleteSongById(id);

  //   return successResponse(h, {
  //     withMessage: true,
  //     responseMessage: 'lagu berhasil dihapus',
  //   });
  // }

  // async truncateTableHandler(request, h) {
  //   await this._service.truncateTable();
  //   return successResponse(h, {
  //     withMessage: true,
  //     responseMessage: 'Tabel berhasil di truncate',
  //   });
  // }
}

module.exports = AlbumsHandler;
