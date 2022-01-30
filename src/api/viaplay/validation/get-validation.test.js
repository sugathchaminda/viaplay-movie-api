const { getTrailerValidation } = require('./get-validation');
const ValidationError = require('../../../errors/validationError');

describe('getTrailerValidation', () => {
  test('accepts valid request', async () => {
    const req = {
      headers: {
        'content-type': 'application/json'
      },
      query: {
        url: 'https://content.viaplay.se/pc-se/film/arrival-2016'
      }
    };

    const res = await getTrailerValidation(req);
    expect(res).toEqual(req);
  });

  test('url must be a string', async () => {
    const req = {
      headers: {
        'content-type': 'application/json'
      },
      query: {
        url: 1
      }
    };

    await expect(getTrailerValidation(req)).rejects.toThrowError(ValidationError);

    req.query.url = 'https://content.viaplay.se/pc-se/film/arrival-2016';

    const res = await getTrailerValidation(req);

    expect(res).toEqual(req);
  });
});
