const api = require('lambda-api')({ version: 'v1.0', base: '/' });
const routes = require('./routes');
const middleware = require('./middleware');

exports.run = async (event, context) => {
  middleware.load(api, event);
  routes.load(api);


  try {
    return await api.run(event, context);
  } catch (err) {
    console.log('ERR: ', err);
    throw new Error('Unknown error occured, handler.js');
  }
};
