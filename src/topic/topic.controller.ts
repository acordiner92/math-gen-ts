import { FastifyRequest, FastifyReply } from 'fastify';
import * as TopicService from './topic.service';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { CreateTopicDto, Topic, UpdateTopicDto } from './topic.domain';
import { CreateTopicEnv, UpdateTopicEnv } from '.';

export const createTopic = (
  request: FastifyRequest<{
    Body: CreateTopicDto;
  }>,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<CreateTopicEnv, Error, Topic> =>
  TopicService.createTopic(request.body);

export const updateTopic = (
  request: FastifyRequest<{
    Body: UpdateTopicDto;
    Params: { id: string };
  }>,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<UpdateTopicEnv, Error, void> =>
  TopicService.updateTopic(request.params.id)(request.body);

export const deleteTopic = (
  request: FastifyRequest<{ Params: { id: string } }>,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<UpdateTopicEnv, Error, void> =>
  TopicService.deleteTopic(request.params.id);
