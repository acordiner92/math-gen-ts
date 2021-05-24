import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import { Response } from 'express';
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

export const createQuestion: Handler<CreateQuestionEnv, Response> = (
  req,
  res,
  next,
) =>
  pipe(
    req.body,
    CreateQuestionDto.decode,
    E.mapLeft(formatValidationErrors('body')),
    RTE.fromEither,
    RTE.chain(QuestionService.createQuestion),
    RTE.foldW(
      e => RT.of(next(e)),
      q => RT.of(res.send(q)),
    ),
  );
