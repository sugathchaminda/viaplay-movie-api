const { get } = require('../api/viaplay/movies/controller');

const baseUrl = '/api/trailer';

module.exports.loadRoutes = (api) => {
  api.get(baseUrl, get);
};
