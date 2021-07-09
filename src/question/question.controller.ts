import { pipe } from 'fp-ts/lib/function';
import { FastifyRequest, FastifyReply } from 'fastify';
import * as QuestionService from './question.service';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { CreateQuestionDto, Question } from './question.domain';
import { CreateQuestionEnv } from '.';
export const createQuestion = (
  request: FastifyRequest<{
    Body: CreateQuestionDto;
  }>,
  _reply: FastifyReply,
): RTE.ReaderTaskEither<CreateQuestionEnv, Error, Question> =>
  pipe(RTE.right(request.body), RTE.chain(QuestionService.createQuestion));
