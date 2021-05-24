import { knex } from '../data/knex';
import { QuestionDb } from '../data/types';
import { Question } from './question.domain';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { pipe, flow } from 'fp-ts/function';

const mapDbToDomain = (row: QuestionDb): Question => ({ ...row });

export const create = (question: Question): TE.TaskEither<Error, Question> =>
  pipe(
    TE.tryCatch(
      () =>
        knex<QuestionDb>('question').insert(question).returning('id').first(),
      () => new Error('Failed to create question.'),
    ),
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

export const getById = (
  questionId: string,
): TE.TaskEither<Error, O.Option<Question>> =>
  pipe(
    TE.tryCatch(
      () =>
        knex<QuestionDb>('question')
          .select('*')
          .where('id', questionId)
          .first(),
      () => new Error(`Failed to retrieve question by id ${questionId}`),
    ),
    TE.map(flow(O.fromNullable)),
    TE.map(O.map(mapDbToDomain)),
  );
