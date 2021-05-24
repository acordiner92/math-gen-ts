import { UUID } from 'io-ts-types/lib/UUID';
import * as t from 'io-ts';

export const CreateQuestionDto = t.type({
  topicId: UUID,
  stage: t.string,
  difficulty: t.string,
  marks: t.number,
  answerSize: t.number,
  question: t.string,
});
export type CreateQuestionDto = t.TypeOf<typeof CreateQuestionDto>;

export type Question = {
  id: string;
  topicId: string;
  stage: string;
  difficulty: string;
  marks: number;
  answerSize: number;
  question: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const create = (
  dto: CreateQuestionDto,
  generatedId: string,
  currentDate: Date,
): Question => ({
  id: generatedId,
  topicId: dto.topicId,
  stage: dto.stage,
  difficulty: dto.difficulty,
  marks: dto.marks,
  answerSize: dto.answerSize,
  question: dto.question,
  isDeleted: false,
  createdAt: currentDate,
  updatedAt: currentDate,
});
