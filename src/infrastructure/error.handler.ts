import { match, instanceOf } from 'ts-pattern';
import { ResourceNotFound } from '../common';

type ErrorResponse = {
  message: string;
  type: string;
  statusCode: number;
};

const buildErrorResponse = (statusCode: number, error: Error) => ({
  message: error.message,
  type: error.name,
  statusCode,
});

const sendInternalServiceError = {
  message: 'An internal server error occured',
  type: 'InternalServiceError',
  statusCode: 500,
};

export const mapToErrorResponse = (error: Error): ErrorResponse =>
  match(error)
    .with(instanceOf(ResourceNotFound), () => buildErrorResponse(404, error))
    .otherwise(() => sendInternalServiceError);
