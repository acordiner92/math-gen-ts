import * as t from 'io-ts';
import * as O from 'fp-ts/Option';
import { pipe, constant } from 'fp-ts/lib/function';

export const CreateTopicDto = t.type({
  name: t.string,
  identifier: t.string,
});
export type CreateTopicDto = t.TypeOf<typeof CreateTopicDto>;

export const UpdateTopicDto = t.partial({
  name: t.string,
  identifier: t.string,
});
export type UpdateTopicDto = t.TypeOf<typeof UpdateTopicDto>;

export type Topic = {
  id: string;
  name: string;
  identifier: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const create = (
  dto: CreateTopicDto,
  generatedId: string,
  currentDate: Date,
): Topic => ({
  id: generatedId,
  name: dto.name,
  identifier: dto.identifier,
  isDeleted: false,
  createdAt: currentDate,
  updatedAt: currentDate,
});

export const update = (
  dto: UpdateTopicDto,
  existingTopic: Topic,
  currentDate: Date,
): Topic => ({
  ...existingTopic,
  name: pipe(
    dto.name,
    O.fromNullable,
    O.getOrElse(constant(existingTopic.name)),
  ),
  identifier: pipe(
    dto.identifier,
    O.fromNullable,
    O.getOrElse(constant(existingTopic.identifier)),
  ),
  updatedAt: currentDate,
});

export const remove = (existingTopic: Topic, currentDate: Date): Topic => ({
  ...existingTopic,
  isDeleted: true,
  updatedAt: currentDate,
});
