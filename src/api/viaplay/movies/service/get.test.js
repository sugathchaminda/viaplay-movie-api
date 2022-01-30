const movieApiHelper = require('../../../../utils/movieApiHelper');
const viaplayApiHelper = require('../../../../utils/viaplayApiHelper');
const { getMovieTrailers } = require('./get');

jest.mock('../../../../utils/movieApiHelper');
jest.mock('../../../../utils/viaplayApiHelper');

describe('getMovieTrailers', () => {
  test('it return a movie trailer', async () => {
    const getImdbDataResult = {
      id: "tt2543164"
    };

    const getMovieTrailerDataResult = {
      status: "success",
      data: "https://youtu.be/7W1m5ER3I1Y"
    };

    viaplayApiHelper.getImdbDatafromUrl.mockResolvedValue(getImdbDataResult);
    movieApiHelper.getMovieTrailer.mockResolvedValue(getMovieTrailerDataResult);

    viaplayApiHelper.getImdbDatafromUrl(getImdbDataResult);
    movieApiHelper.getMovieTrailer(getMovieTrailerDataResult);

    const viaplayApiSpy = jest.spyOn(viaplayApiHelper, 'getImdbDatafromUrl');
    const movieApiSpy = jest.spyOn(movieApiHelper, 'getMovieTrailer');
    

    const req = {
      headers: {
        'content-type': 'application/json'
      },
      query: {
        url: 'https://content.viaplay.se/pc-se/film/arrival-2016'
      }
    };

    const res = await getMovieTrailers(req);
    expect(res).toEqual(getMovieTrailerDataResult);
    expect(viaplayApiSpy).toBeCalledTimes(2);
    expect(movieApiSpy).toBeCalledTimes(2);
  });

  test('it supplies url to viaplayHelper', async () => {
    const getImdbDataResult = {
      id: "tt2543164"
    };
    const getMovieTrailerDataResult = {
      status: "success",
      data: "https://youtu.be/7W1m5ER3I1Y"
    };
    const url = 'https://content.viaplay.se/pc-se/film/arrival-2016';

    viaplayApiHelper.getImdbDatafromUrl.mockResolvedValue(getImdbDataResult);

    const viaplayApiSpy = jest.spyOn(viaplayApiHelper, 'getImdbDatafromUrl');

    const req = {
      headers: {
        'content-type': 'application/json'
      },
      query: {
        url
      }
    };

    const res = await getMovieTrailers(req);
    expect(res).toEqual(getMovieTrailerDataResult);
    expect(viaplayApiSpy).toBeCalledTimes(1);
    expect(viaplayApiSpy).toBeCalledWith(url);
  });
});
