import Fastify, { FastifyServerOptions, FastifyInstance } from 'fastify';
import fastifyFunky from 'fastify-funky';
import { pipe } from 'fp-ts/lib/function';
import { mapToErrorResponse, sendHook } from './infrastructure';
import { routes as questionRoutes } from './question';
import { routes as topicRoutes } from './topic';

export const build = (options: FastifyServerOptions = {}): FastifyInstance =>
  Fastify(options)
    .setErrorHandler((error, _request, reply) =>
      pipe(mapToErrorResponse(error), x => reply.code(x.statusCode).send(x)),
    )
    .addHook('onSend', (_request, reply, payload) =>
      sendHook(payload, () => reply.code(204).send()),
    )
    .register(fastifyFunky)
    .register(questionRoutes, { prefix: '/api/v1' })
    .register(topicRoutes, { prefix: '/api/v1' });
