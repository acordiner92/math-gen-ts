/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { FastifyInstance, FastifySchemaCompiler } from 'fastify';
import * as TE from 'fp-ts/TaskEither';
import { createQuestion } from './question.controller';
import * as t from 'io-ts';
import { CreateQuestionDto, Question } from './question.domain';
import * as QuestionRepository from './question.repository';
import { validatorCompiler } from '../infrastructure';

export type CreateQuestionEnv = (
  question: Question,
) => TE.TaskEither<Error, Question>;

export const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: CreateQuestionDto }, unknown, t.Type<CreateQuestionDto>>(
    '/question',
    {
      schema: {
        body: CreateQuestionDto,
      },
      validatorCompiler: validatorCompiler<CreateQuestionDto>(),
    },
    async (request, reply) =>
      createQuestion(request, reply)(QuestionRepository.create),
  );
};
