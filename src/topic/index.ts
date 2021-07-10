import { FastifyInstance } from 'fastify';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { createTopic, deleteTopic, updateTopic } from './topic.controller';
import { CreateTopicDto, Topic, UpdateTopicDto } from './topic.domain';
import * as TopicRepository from './topic.repository';
import * as t from 'io-ts';
import { validatorCompiler } from '../infrastructure';

export type CreateTopicEnv = (topic: Topic) => TE.TaskEither<Error, Topic>;
export type UpdateTopicEnv = {
  updateTopic: (topic: Topic) => TE.TaskEither<Error, void>;
  getTopicById: (topicId: string) => TE.TaskEither<Error, O.Option<Topic>>;
};
export type DeleteTopicEnv = {
  updateTopic: (topic: Topic) => TE.TaskEither<Error, void>;
  getTopicById: (topicId: string) => TE.TaskEither<Error, O.Option<Topic>>;
};

export const routes = async (
  fastify: FastifyInstance,
): Promise<FastifyInstance> =>
  fastify
    .post<{ Body: CreateTopicDto }, unknown, t.Type<CreateTopicDto>>(
      '/topic',
      {
        schema: {
          body: CreateTopicDto,
        },
        validatorCompiler: validatorCompiler<CreateTopicDto>(),
      },
      async (request, reply) =>
        createTopic(request, reply)(TopicRepository.create),
    )
    .patch<
      { Body: UpdateTopicDto; Params: { id: string } },
      unknown,
      t.Type<UpdateTopicDto>
    >(
      '/topic/:id',
      {
        schema: {
          body: UpdateTopicDto,
        },
        validatorCompiler: validatorCompiler<UpdateTopicDto>(),
      },
      async (request, reply) =>
        updateTopic(
          request,
          reply,
        )({
          updateTopic: TopicRepository.update,
          getTopicById: TopicRepository.getById,
        }),
    )
    .delete<{ Params: { id: string } }>('/topic/:id', async (request, reply) =>
      deleteTopic(
        request,
        reply,
      )({
        updateTopic: TopicRepository.update,
        getTopicById: TopicRepository.getById,
      }),
    );
