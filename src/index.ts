/* eslint-disable fp/no-unused-expression */
import Fastify from 'fastify';
import fastifyFunky from 'fastify-funky';
import { routes } from './question';

const port = 8080;
const server = Fastify({
  logger: true,
});

void server.register(fastifyFunky);
void server.register(routes, { prefix: '/api/v1' });
void server.listen(port);
