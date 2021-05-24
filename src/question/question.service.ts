import { create, Question } from './question.domain';
import { CreateQuestionDto } from './question.domain';
import { v4 as uuidv4 } from 'uuid';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { pipe } from 'fp-ts/function';
import { CreateQuestionEnv } from './question.controller';

export const createQuestion = (
  dto: CreateQuestionDto,
): RTE.ReaderTaskEither<CreateQuestionEnv, Error, Question> =>
  pipe(
    RTE.asks<CreateQuestionEnv, never, CreateQuestionEnv>(x => x),
    RTE.chainTaskEitherK(saveQuestion =>
      saveQuestion(create(dto, uuidv4(), new Date())),
    ),
  );
