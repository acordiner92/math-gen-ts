import { knex } from '../data/knex';
import { TopicDb } from '../data/types';
import { Topic } from './topic.domain';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { pipe, flow, constVoid } from 'fp-ts/function';

const mapDbToDomain = (row: TopicDb): Topic => ({ ...row });

export const create = (topic: Topic): TE.TaskEither<Error, Topic> =>
  pipe(
    TE.tryCatch(
      () => knex<TopicDb>('topic').insert(topic),
      () => new Error('Failed to create question.'),
    ),
    TE.map(() => topic),
  );
export type Create = typeof create;

export const update = (existingTopic: Topic): TE.TaskEither<Error, void> =>
  pipe(
    TE.tryCatch(
      () =>
        knex<TopicDb>('topic')
          .where({ id: existingTopic.id })
          .update(existingTopic),
      () => new Error('Failed to create question.'),
    ),
    TE.map(constVoid),
  );
export type Update = typeof update;

export const getById = (
  topicId: string,
): TE.TaskEither<Error, O.Option<Topic>> =>
  pipe(
    TE.tryCatch(
      () => knex<TopicDb>('topic').select('*').where('id', topicId).first(),
      () => new Error(`Failed to retrieve topic by id ${topicId}`),
    ),
    TE.map(flow(O.fromNullable)),
    TE.map(O.map(mapDbToDomain)),
  );
export type GetById = typeof getById;
