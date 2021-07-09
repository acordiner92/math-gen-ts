import { v4 as uuidv4 } from 'uuid';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { pipe } from 'fp-ts/function';
import { create, Question, CreateQuestionDto } from './question.domain';
import { CreateQuestionEnv } from '.';

export const createQuestion = (
  dto: CreateQuestionDto,
): RTE.ReaderTaskEither<CreateQuestionEnv, Error, Question> =>
  pipe(
    RTE.ask<CreateQuestionEnv>(),
    RTE.chainTaskEitherK(saveQuestion =>
      saveQuestion(create(dto, uuidv4(), new Date())),
    ),
  );
