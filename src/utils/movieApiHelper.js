const axios = require('axios');
const get = require('lodash/get');

const getMovieTrailer = async (movieId) => {
  const { data } = await axios({
    method: 'get',
    url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    params: {
      api_key: process.env.THE_MOVIE_API_KEY
    }
  });

  try {
    const trailers = get(data, 'results', []);
    const youTubeTrailerInfo = trailers.find((trailer) => trailer.type === 'Trailer' && trailer.site === 'YouTube');

    if (youTubeTrailerInfo) {
      return `https://youtu.be/${youTubeTrailerInfo.key}`;
    }

    throw new Error('movie trailers not available');


  } catch (err) {
    console.error('cannot retrieve movie trailer', err);
    throw new Error('cannot retrieve movie trailer');
  }
};

module.exports = {
  getMovieTrailer
};

