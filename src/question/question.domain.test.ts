/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { v4 as uuidv4 } from 'uuid';
import {
  CreateTopicDtoFactory,
  TopicFactory,
  UpdateTopicDtoFactory,
} from '../../test/factories/topic.factory';
import { getTestFileName } from '../../test';
import { create, remove, update } from '../topic/topic.domain';

describe(getTestFileName(), () => {
  describe(create.name, () => {
    test('CreateTopicDto fields are mapped correctly', () => {
      const topic = CreateTopicDtoFactory.build();
      expect(create(topic, uuidv4(), new Date())).toMatchObject({
        name: topic.name,
        identifier: topic.identifier,
      });
    });

    test('createdAt and updatedAt are set to current date', () => {
      const currentDate = new Date();
      const topic = CreateTopicDtoFactory.build();
      expect(create(topic, uuidv4(), currentDate)).toMatchObject({
        createdAt: currentDate,
        updatedAt: currentDate,
      });
    });

    test('is not marked as deleted', () => {
      const topic = CreateTopicDtoFactory.build();
      expect(create(topic, uuidv4(), new Date()).isDeleted).toBeFalsy();
    });

    test('has an id generated', () => {
      const id = uuidv4();
      const topic = CreateTopicDtoFactory.build();
      expect(create(topic, id, new Date()).id).toBe(id);
    });
  });

  describe(update.name, () => {
    test('UpdateTopicDto fields are mapped correctly', () => {
      const topicToUpdate = UpdateTopicDtoFactory.build({
        name: undefined,
      });
      const topic = TopicFactory.build();
      expect(update(topicToUpdate, topic, new Date())).toMatchObject({
        name: topic.name,
        identifier: topicToUpdate.identifier,
      });
    });

    test('updatedAt is set to current date', () => {
      const currentDate = new Date();
      const topicToUpdate = UpdateTopicDtoFactory.build();
      const topic = TopicFactory.build();
      expect(update(topicToUpdate, topic, currentDate).updatedAt).toMatchObject(
        currentDate,
      );
    });

    test('createdAt is unchanged', () => {
      const topicToUpdate = UpdateTopicDtoFactory.build();
      const topic = TopicFactory.build();
      expect(update(topicToUpdate, topic, new Date()).createdAt).toMatchObject(
        topic.createdAt,
      );
    });
  });

  describe(remove.name, () => {
    test('isDeleted is set to true', () => {
      const topic = TopicFactory.build();
      expect(remove(topic, new Date()).isDeleted).toBeTruthy();
    });

    test('updatedAt is set to current date', () => {
      const currentDate = new Date();
      const topic = TopicFactory.build();
      expect(remove(topic, currentDate).updatedAt).toMatchObject(currentDate);
    });
  });
});

export {};
