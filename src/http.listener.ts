import { combineRoutes, httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from '@marblejs/middleware-cors';
import { api$ } from './api.effects';
import { question$ } from './question';

const middlewares = [logger$(), bodyParser$(), cors$()];

const effects = combineRoutes('/api/v1', [api$, question$]);

export const listener = httpListener({
  middlewares,
  effects: [effects],
});
