const controller = require('../../../controller');

const traileralidation = require('../validation/get-validation');
const trailerService = require('./service/get');

const get = async (req, res) => {
  await controller(req, res, {
    validator: traileralidation.getTrailerValidation,
    service: trailerService.getMovieTrailers
  });
};

module.exports = {
  get
};
