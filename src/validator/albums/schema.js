const Joi = require('joi');

const AlbumPostPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().min(1900).max(2100).required(),
});

module.exports = { AlbumPostPayloadSchema };
