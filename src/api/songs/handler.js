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
    });
  }

  async getSongHandler(request, h) {
    const { id: songId } = request.params;
    const songDetails = await this._songsService.getSongById(songId);

    return successResponse(h, {
      responseData: { song: songDetails },
    });
  }

  async putSongHandler(request, h) {
    this._validator.validatePutSongPayload(request.payload);

    const { id: songId } = request.params;
    await this._songsService.editSongById(songId, request.payload);

    return successResponse(h, {
      responseMessage: `Data song dengan id ${songId} berhasil diperbarui`,
    });
  }

  async deleteSongHandler(request, h) {
    const { id: songId } = request.params;
    await this._songsService.deleteSongById(songId, request.payload);

    return successResponse(h, {
      responseMessage: `Data song dengan id ${songId} berhasil dihapus`,
    });
  }
}

module.exports = SongsHandler;
