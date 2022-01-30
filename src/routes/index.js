const viaplayMovieInfo = require('./getMovieInfo');

module.exports.load = (api) => {

  // Not sure if this is needed... AW 2019-08-01
  api.options('/*', (req, res) => {
    // Return CORS headers
    res.cors().send({});
  });

  viaplayMovieInfo.loadRoutes(api);
};
