const InvariantError = require('../../exceptions/InvariantError');
const { SongPostPayloadSchema } = require('./schema');

const SongsValidator = {
  validatePostSongPayload: (payload) => {
    const validationResult = SongPostPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator;
