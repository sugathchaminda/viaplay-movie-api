

const axios = require('axios');
const get = require('lodash/get');
const { URL } = require('url');

const isValidUrl = (url) => {
  const { protocol, host, pathname } = new URL(url);

  return (
    protocol === 'https:' &&
      host === 'content.viaplay.se' &&
      pathname.startsWith('/pc-se/film/') &&
      pathname.length > '/pc-se/film/'.length
  );
};

const getfromUrl = async (url) => {
  if (isValidUrl(url)) {
    const { data } = await axios({ method: 'get', url });

    try {
      return data;
    } catch (err) {
      console.error('cannot retrieve the movie data from Viaplay', err);
      throw new Error('cannot retrieve the movie data from Viaplay');
    }
  }

  throw new Error('invalid viaplay movie url');
};

const getImdbDatafromUrl = async (url) => {
  const movieData = await getfromUrl(url);
  const imdbIdData = get(movieData, '_embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb', null);
  if (imdbIdData === null) {
    throw new Error('IMDB data is missing in the movie');
  }

  return imdbIdData;
};

module.exports = {
  getImdbDatafromUrl
};
