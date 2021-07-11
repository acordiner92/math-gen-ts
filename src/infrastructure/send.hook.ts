import type { FastifyReply } from 'fastify';

type SendNoContent = () => FastifyReply;

const isEmpty = (payload: unknown) =>
  payload === undefined ||
  payload === null ||
  payload === '' ||
  payload === '{"_tag":"Right"}';

export const sendHook = async (
  payload: unknown,
  sendNoContent: SendNoContent,
): Promise<unknown> => (isEmpty(payload) ? await sendNoContent() : payload);
