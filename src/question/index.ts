/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { FastifyInstance } from 'fastify';
import * as TE from 'fp-ts/TaskEither';
import { validatorCompiler } from '../infrastructure';
import { createQuestion } from './question.controller';
import { CreateQuestionDto, Question } from './question.domain';
import * as QuestionRepository from './question.repository';

export type CreateQuestionEnv = (
  question: Question,
) => TE.TaskEither<Error, Question>;

export const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: CreateQuestionDto }>(
    '/question',
    {
      validatorCompiler: validatorCompiler(CreateQuestionDto),
    },
    async (request, reply) =>
      createQuestion(request, reply)(QuestionRepository.create),
  );
};
