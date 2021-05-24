import { Router } from 'express';
import { createQuestion } from './question.controller';
import * as QuestionRepository from './question.repository';

export const router = Router();

// eslint-disable-next-line fp/no-unused-expression
router.post('/', (req, res, next) =>
  createQuestion(req, res, next)(QuestionRepository.create)(),
);
