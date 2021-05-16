import { combineRoutes } from '@marblejs/core';
import { questionCreated$ } from './question.effects';

export const question$ = combineRoutes('/question', {
  effects: [questionCreated$],
});
