const Joi = require('joi');

const getMovieTrailers = () => {
  return Joi.object().keys({
    url: Joi.string().required(),
  })
}


module.exports = {
  getMovieTrailers,
};
