import { t } from '@marblejs/middleware-io';
import { UUID } from 'io-ts-types/lib/UUID';

export const CreateQuestionDto = t.type({
  topicId: UUID,
  stage: t.string,
  difficulty: t.string,
  marks: t.number,
  answerSize: t.number,
  question: t.string,
});
