import { FastifyInstance } from 'fastify';
import { createTopic, deleteTopic, updateTopic } from './topic.controller';
import { CreateTopicDto, UpdateTopicDto } from './topic.domain';
import * as TopicRepository from './topic.repository';
import * as t from 'io-ts';
import { validatorCompiler } from '../infrastructure';

export type CreateTopicEnv = TopicRepository.Create;
export type UpdateTopicEnv = {
  updateTopic: TopicRepository.Update;
  getTopicById: TopicRepository.GetById;
};
export type DeleteTopicEnv = {
  updateTopic: TopicRepository.Update;
  getTopicById: TopicRepository.GetById;
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
