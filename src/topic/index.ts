/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { FastifyInstance } from 'fastify';
import { createTopic } from './topic.controller';
import * as TopicRepository from './topic.repository';

export const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/topic', async (request, reply) =>
    createTopic(request, reply)(TopicRepository.create),
  );
};
