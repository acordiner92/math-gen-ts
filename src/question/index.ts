/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { FastifyInstance } from 'fastify';
import { createQuestion } from './question.controller';
import * as QuestionRepository from './question.repository';

export const routes = async (fastify: FastifyInstance): void => {
  fastify.post('/question', async (request, reply) =>
    createQuestion(request, reply)(QuestionRepository.create),
  );
};
