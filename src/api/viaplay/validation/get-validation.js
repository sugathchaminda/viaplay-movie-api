const { clean, validate } = require('../../../schemas/validation/validationHelper');
const schema = require('../../../schemas/validation/movies-schema');
const ValidationError = require('../../../errors/validationError');
const { createValidationMetadata,
  validationTypes
} = require('../../../utils/errorHelper');

async function getTrailerValidation (req) {
  const attributes = clean({
    url: req.query?.url
  });

  const baseValidationResult = await validate(attributes, schema.getMovieTrailers);

  if (baseValidationResult.error) {
    throw new ValidationError({
      metadata: createValidationMetadata(validationTypes.BASE, baseValidationResult.error)
    });
  }

  return req;
}


module.exports = {
  getTrailerValidation
};
