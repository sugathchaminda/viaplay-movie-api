const getContentTypeFromRequest = (req) => req?.headers['content-type'] || req?.headers['Content-type'] || req?.headers['Content-Type'] ;

module.exports = {
  getContentTypeFromRequest
};
