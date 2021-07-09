import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import { FastifyRequest, FastifyReply } from 'fastify';
import * as QuestionService from './question.service';
import * as RTE from 'fp-ts/ReaderTaskEither';
import * as RT from 'fp-ts/ReaderTask';
import * as TE from 'fp-ts/TaskEither';
import { CreateQuestionDto, Question } from './question.domain';
import { Handler } from '../infrastructure/types';

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

export type CreateQuestionEnv = (
  question: Question,
) => TE.TaskEither<Error, Question>;

export const createQuestion = (
  request: FastifyRequest,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<CreateQuestionEnv, Error, Question> =>
  pipe(
    request.body,
    CreateQuestionDto.decode,
    E.mapLeft(formatValidationErrors('body')),
    RTE.fromEither,
    RTE.chain(QuestionService.createQuestion),
  );
