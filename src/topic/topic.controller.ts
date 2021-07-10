import { pipe } from 'fp-ts/lib/function';
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
  pipe(RTE.right(request.body), RTE.chain(TopicService.createTopic));

export const updateTopic = (
  request: FastifyRequest<{
    Body: UpdateTopicDto;
  }>,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<UpdateTopicEnv, Error, void> =>
  pipe(RTE.right(request.body), RTE.chain(TopicService.updateTopic));
