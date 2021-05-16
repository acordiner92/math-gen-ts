import { httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from '@marblejs/middleware-cors';
import { api$ } from './api.effects';

const middlewares = [logger$(), bodyParser$(), cors$()];

const effects = [api$];

export const listener = httpListener({
  middlewares,
  effects,
});
