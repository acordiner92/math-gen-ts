import { FastifyRequest, FastifyReply } from 'fastify';

const isEmpty = (payload: unknown) =>
  payload === undefined ||
  payload === null ||
  payload === '' ||
  payload === '{"_tag":"Right"}';

export const sendHook = async (
  _request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown,
): Promise<unknown> => (isEmpty(payload) ? reply.code(204).send() : payload);
