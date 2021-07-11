import { FastifyRequest, FastifyReply } from 'fastify';
import { pipe, flow, constVoid } from 'fp-ts/lib/function';
import * as M from 'pattern-matching-ts/match';

type ErrorResponse = {
  message: string;
  type: string;
  statusCode: number;
};

const buildErrorResponse = (statusCode: number) => (error: Error) => ({
  message: error.message,
  type: error.name,
  statusCode,
});

const sendResponse = (reply: FastifyReply) => (errorResponse: ErrorResponse) =>
  reply.code(errorResponse.statusCode).send(errorResponse);

const sendInternalServiceError = (reply: FastifyReply) =>
  reply.code(500).send({
    message: 'An internal server error occured',
    type: 'InternalServiceError',
    statusCode: 500,
  });

export const errorHandler = (
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply,
): void =>
  pipe(
    error,
    M.matchW('name')({
      ResourceNotFound: flow(buildErrorResponse(404), sendResponse(reply)),
      _: () => sendInternalServiceError(reply),
    }),
    constVoid,
  );
