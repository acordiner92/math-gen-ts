import faker from 'faker';
import Factory from 'factory.ts';
import {
  Topic,
  CreateTopicDto,
  UpdateTopicDto,
} from '../../src/topic/topic.domain';

export const CreateTopicDtoFactory = Factory.Sync.makeFactory<CreateTopicDto>({
  name: faker.random.word(),
  identifier: faker.random.word(),
});

export const UpdateTopicDtoFactory = Factory.Sync.makeFactory<UpdateTopicDto>({
  name: faker.random.word(),
  identifier: faker.random.word(),
});

export const TopicFactory = Factory.Sync.makeFactory<Topic>({
  id: faker.datatype.uuid(),
  name: faker.random.word(),
  identifier: faker.random.word(),
  isDeleted: false,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
});
