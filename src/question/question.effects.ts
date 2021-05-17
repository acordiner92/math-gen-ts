import { r } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';
import { requestValidator$ } from '@marblejs/middleware-io';
import { CreateQuestionDto } from './createQuestion.dto';

const validateRequest = requestValidator$({
  body: CreateQuestionDto,
});

export const questionCreated$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      validateRequest,
      mapTo({
        body: {
          message: 'Get question data',
        },
      }),
    ),
  ),
);
