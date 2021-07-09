import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import { FastifyRequest, FastifyReply } from 'fastify';
import * as TopicService from './topic.service';
import * as RTE from 'fp-ts/ReaderTaskEither';
import * as TE from 'fp-ts/TaskEither';
import { CreateTopicDto, Topic } from './topic.domain';

const formatValidationErrorAll = (validationErrors: t.ValidationError[]) =>
  validationErrors.map(x => x.message);
export const formatValidationErrors =
  (context: string) =>
  (validationErrors: t.ValidationError[]): Error =>
    new Error(
      `Validation errors for ${context}: ${formatValidationErrorAll(
        validationErrors,
      ).join(', ')}`,
    );

export type CreateTopicEnv = (topic: Topic) => TE.TaskEither<Error, Topic>;

export const createTopic = (
  request: FastifyRequest,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<CreateTopicEnv, Error, Topic> =>
  pipe(
    request.body,
    CreateTopicDto.decode,
    E.mapLeft(formatValidationErrors('body')),
    RTE.fromEither,
    RTE.chain(TopicService.createTopic),
  );
