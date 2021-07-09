/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { FastifyInstance } from 'fastify';
import * as TE from 'fp-ts/TaskEither';
import { validatorCompiler } from '../infrastructure';
import { createTopic } from './topic.controller';
import { CreateTopicDto, Topic } from './topic.domain';
import * as TopicRepository from './topic.repository';

export type CreateTopicEnv = (topic: Topic) => TE.TaskEither<Error, Topic>;

export const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: CreateTopicDto }>(
    '/topic',
    {
      validatorCompiler: validatorCompiler(CreateTopicDto),
    },
    async (request, reply) =>
      createTopic(request, reply)(TopicRepository.create),
  );
};
