import { pipe } from 'fp-ts/lib/function';
import { FastifyRequest, FastifyReply } from 'fastify';
import * as TopicService from './topic.service';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { CreateTopicDto, Topic } from './topic.domain';
import { CreateTopicEnv } from '.';

export const createTopic = (
  request: FastifyRequest<{
    Body: CreateTopicDto;
  }>,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<CreateTopicEnv, Error, Topic> =>
  pipe(RTE.right(request.body), RTE.chain(TopicService.createTopic));
