/*
 * Helpers to allow the api to be agnostic regarding payload version. This is so that
 * we can use serverless offline to test.
 */

const getPath = (event) =>
  // HTTP API v2.0 adds the `stage` to the path so remove it as v1.0 omits the stage
  event.path || event.requestContext.path || event.requestContext.http.path.replace(`/${event.requestContext.stage}`, '')


const getHttpMethod = (event) => event.httpMethod || event.requestContext.http.method

const getAuthToken = (event) => event.authorizationToken || event.headers.authorization;

module.exports = {
  getPath,
  getHttpMethod,
  getAuthToken
}
