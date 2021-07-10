import { knex } from '../data/knex';
import { TopicDb } from '../data/types';
import { Topic } from './topic.domain';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { pipe, flow } from 'fp-ts/function';

const mapDbToDomain = (row: TopicDb): Topic => ({ ...row });

export const create = (topic: Topic): TE.TaskEither<Error, Topic> =>
  pipe(
    TE.tryCatch(
      () => knex<TopicDb>('topic').insert(topic).returning('id'),
      () => new Error('Failed to create question.'),
    ),
    TE.map(x => x[0]),
    TE.chain(
      flow(
        O.fromNullable,
        TE.fromOption(() => new Error('Failed to insert question to database')),
      ),
    ),
    TE.chain(getById),
    TE.chain(TE.fromOption(() => new Error('Unable to find inserted'))),
    TE.map(mapDbToDomain),
  );

export const update = (existingTopic: Topic): TE.TaskEither<Error, void> =>
  pipe(
    TE.tryCatch(
      () =>
        knex<TopicDb>('topic')
          .where({ id: existingTopic.id })
          .update(existingTopic),
      () => new Error('Failed to create question.'),
    ),
  );

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
