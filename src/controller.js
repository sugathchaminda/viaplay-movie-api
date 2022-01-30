const { defaultReject, defaultResolve, defaultRejectXML, defaultResolveXML } = require('./utils/responseHelper');
const { getContentTypeFromRequest } = require('./utils/requestHelper');

module.exports = async function controller (req, res, params) {
  const contentType = getContentTypeFromRequest(req);
  const isXml = contentType.toLowerCase() === 'application/xml';
  const resolve = isXml ? defaultResolveXML : defaultResolve;
  const reject = isXml ? defaultRejectXML : defaultReject;

  try {
    const validRequest = await params.validator(req);
    const data = await params.service(validRequest);

    return resolve(res, data);
  } catch (err) {
    return reject(err, res, req);
  }
};
