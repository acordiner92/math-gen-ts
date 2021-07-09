import * as t from 'io-ts';

export const CreateTopicDto = t.type({
  name: t.string,
  identifier: t.string,
});

export type CreateTopicDto = t.TypeOf<typeof CreateTopicDto>;

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
