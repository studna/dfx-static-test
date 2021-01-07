/* eslint-disable max-classes-per-file */
export class GQLError extends Error {
  constructor(message, operationName, variables, errorType, statusCode) {
    super(JSON.stringify({
      message,
      operationName,
      variables,
      errorType,
      statusCode,
    }));

    this.name = 'GQLError';
  }
}

export class GQLTokenExpiredError extends GQLError {
  constructor(...params) {
    super(...params);
    this.name = 'GQLTokenExpiredError';
  }
}


export class GQLUnauthorizedError extends GQLError {
  constructor(...params) {
    super(...params);
    this.name = 'GQLUnauthorizedError';
  }
}

export class GQLNetworkError extends GQLError {
  constructor(...params) {
    super(...params);
    this.name = 'GQLNetworkError';
  }
}
