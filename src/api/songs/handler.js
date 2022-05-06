const autoBind = require('auto-bind');
const { successResponse } = require('../../utils/responses');

class SongsHandler {
  constructor(songsService, validator) {
    this._songsService = songsService;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validatePostSongPayload(request.payload);

    const newSongId = await this._songsService.addSong(request.payload);

    return successResponse(h, {
      responseData: { songId: newSongId },
      responseCode: 201,
    });
  }

  async getAllSongsHandler(_, h) {
    const songs = await this._songsService.getAllSongs();

    return successResponse(h, {
      responseData: { songs },
      responseCode: 200,
    });
  }

  async getSongByIdHandler(request, h) {
    const { id: songId } = request.params;
    const songDetails = await this._songsService.getSongById(songId);

    return successResponse(h, {
      responseData: { song: songDetails },
      responseCode: 200,
    });
  }

  // async putAlbumHandler(request, h) {
  //   this._validator.validatePutAlbumPayload(request.payload);

  //   const { id: albumId } = request.params;
  //   await this._albumsService.editAlbumById(albumId, request.payload);

  //   return successResponse(h, {
  //     responseMessage: `data album dengan id ${albumId} berhasil diperbarui`,
  //   });
  // }

  // async deleteAlbumHandler(request, h) {
  //   const { id: albumId } = request.params;
  //   await this._albumsService.deleteAlbumById(albumId);

  //   return successResponse(h, {
  //     responseMessage: `data album dengan id ${albumId} berhasil dihapus`,
  //   });
  // }
}

module.exports = SongsHandler;
