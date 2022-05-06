const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPostPayloadSchema } = require('./schema');

const AlbumsValidator = {
  validatePostAlbumPayload: ({ payload }) => {
    const validationResult = AlbumPostPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
