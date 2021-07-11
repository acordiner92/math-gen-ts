import Fastify, { FastifyServerOptions, FastifyInstance } from 'fastify';
import fastifyFunky from 'fastify-funky';
import { routes as questionRoutes } from './question';
import { routes as topicRoutes } from './topic';

export const build = (
  options: FastifyServerOptions | undefined,
): FastifyInstance =>
  Fastify(options)
    .register(fastifyFunky)
    .register(questionRoutes, { prefix: '/api/v1' })
    .register(topicRoutes, { prefix: '/api/v1' });
