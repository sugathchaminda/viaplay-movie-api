/* eslint-disable no-underscore-dangle */
const getError = (error) => {
  const errorType = error.type || 'E_UNKNOWN';
  const errorMessage = error.message || 'An unknown error occured';
  const metadata = error.metadata || null;
  let errorStatusCode;

  switch (error.type) {
  case 'E_INVALID_PARAMETER':
    errorStatusCode = 400;
    break;
  case 'E_UNAUTHORIZED_CLIENT':
    errorStatusCode = 401;
    break;
  case 'E_CLIENT_UNSUCCESSFUL_AUTHENTICATION':
    errorStatusCode = 401;
    break;
  case 'E_MISSING_PERMISSION':
    errorStatusCode = 403;
    break;
  case 'E_MISSING':
    errorStatusCode = 404;
    break;
  case 'E_AWS_ERROR':
    errorStatusCode = 400;
    break;
  case 'E_CONFLICT':
    errorStatusCode = 409;
    break;
  case 'E_VALIDATION':
    errorStatusCode = 422;
    break;
  default:
    errorStatusCode = 500;
  }

  /*
   * Remove the api-key from the error response!
   * Not sure how/why it ends up under the "auth" attribute but remove both to be safe!
   */
  if (metadata && metadata._original) {
    delete metadata._original.auth;
    delete metadata._original.authorization;
  }

  return {
    statusCode: errorStatusCode,
    metadata,
    response: {
      status: 'error',
      type: errorType,
      data: errorMessage
    }
  };
}

function defaultReject(error, response) {
  const errorValue = getError(error);
  const metadata = errorValue.metadata?.json || errorValue.metadata;

  return response
    .status(errorValue.statusCode)
    .json({...errorValue.response, metadata});
}


const defaultResolve = (res, data) => {
  const successResponse = {
    status: 'success',
    data
  };

  return res
    .status(200)
    .json(successResponse);
};

module.exports = {
  defaultReject,
  defaultResolve
};
