/* eslint-disable fp/no-unused-expression */
import Fastify from 'fastify';
import fastifyFunky from 'fastify-funky';
import { routes as questionRoutes } from './question';
import { routes as topicRoutes } from './topic';

const port = 8080;
const server = Fastify({
  logger: true,
});

void server.register(fastifyFunky);
void server.register(questionRoutes, { prefix: '/api/v1' });
void server.register(topicRoutes, { prefix: '/api/v1' });
void server.listen(port);
