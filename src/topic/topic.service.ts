import { v4 as uuidv4 } from 'uuid';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { pipe } from 'fp-ts/function';
import { create, Topic, CreateTopicDto } from './topic.domain';
import { CreateTopicEnv } from './topic.controller';

export const createTopic = (
  dto: CreateTopicDto,
): RTE.ReaderTaskEither<CreateTopicEnv, Error, Topic> =>
  pipe(
    RTE.asks<CreateTopicEnv, never, CreateTopicEnv>(x => x),
    RTE.chainTaskEitherK(saveTopic =>
      saveTopic(create(dto, uuidv4(), new Date())),
    ),
  );
