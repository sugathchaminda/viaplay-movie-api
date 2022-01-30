const ErrorHelper = require('../../../../errors/errorHelper');
const { getImdbDatafromUrl } = require('../../../../utils/viaplayApiHelper');
const { getMovieTrailer } = require('../../../../utils/movieApiHelper');

const getMovieTrailers = async (req) => {
  try {
    const { id: imdbId } = await getImdbDatafromUrl(req.query.url);

    return getMovieTrailer(imdbId);
  } catch (err) {
    return ErrorHelper(err);
  }
};

module.exports = {
  getMovieTrailers
};
