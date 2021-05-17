import { combineRoutes } from '@marblejs/core';
import { createQuestion$ } from './question.effects';

export const question$ = combineRoutes('/question', {
  effects: [createQuestion$],
});
