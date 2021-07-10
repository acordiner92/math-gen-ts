import { v4 as uuidv4 } from 'uuid';
import * as RTE from 'fp-ts/ReaderTaskEither';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import {
  create,
  Topic,
  CreateTopicDto,
  UpdateTopicDto,
  update,
  remove,
} from './topic.domain';
import { CreateTopicEnv, DeleteTopicEnv, UpdateTopicEnv } from '.';

export const createTopic = (
  dto: CreateTopicDto,
): RTE.ReaderTaskEither<CreateTopicEnv, Error, Topic> =>
  pipe(
    RTE.ask<CreateTopicEnv>(),
    RTE.chainTaskEitherK(saveTopic =>
      saveTopic(create(dto, uuidv4(), new Date())),
    ),
  );

export const updateTopic = (
  topicId: string,
  dto: UpdateTopicDto,
): RTE.ReaderTaskEither<UpdateTopicEnv, Error, void> =>
  pipe(
    RTE.ask<UpdateTopicEnv>(),
    RTE.chainTaskEitherK(env =>
      pipe(
        topicId,
        env.getTopicById,
        TE.chain(
          TE.fromOption(() => new Error(`No topic found for topic ${topicId}`)),
        ),
        TE.chain(x => env.updateTopic(update(dto, x, new Date()))),
      ),
    ),
  );

export const deleteTopic = (
  topicId: string,
): RTE.ReaderTaskEither<DeleteTopicEnv, Error, void> =>
  pipe(
    RTE.ask<DeleteTopicEnv>(),
    RTE.chainTaskEitherK(env =>
      pipe(
        topicId,
        env.getTopicById,
        TE.chain(
          TE.fromOption(() => new Error(`No topic found for topic ${topicId}`)),
        ),
        TE.chain(x => env.updateTopic(remove(x, new Date()))),
      ),
    ),
  );
