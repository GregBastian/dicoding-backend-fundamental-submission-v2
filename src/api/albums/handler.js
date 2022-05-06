const autoBind = require('auto-bind');
const { successResponse } = require('../../utils/responses');

class AlbumsHandler {
  constructor(albumsService, validator) {
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validatePostAlbumPayload(request.payload);

    const newAlbumId = await this._albumsService.addAlbum(request.payload);

    return successResponse(h, {
      responseData: { albumId: newAlbumId },
      responseCode: 201,
    });
  }

  async getAlbumHandler(request, h) {
    const { id: albumId } = request.params;
    const albumDetails = await this._albumsService.getAlbum(albumId);

    return successResponse(h, {
      responseData: { album: albumDetails },
      responseCode: 200,
    });
  }
}

module.exports = AlbumsHandler;
