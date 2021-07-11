/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import {
  getTestFileName,
  clearDb,
  CreateTopicDtoFactory,
  TopicFactory,
} from '../../test';
import { v4 as uuidv4 } from 'uuid';
import { build } from '../app';
import { knex } from '../data/knex';
import { TopicDb } from '../data/types';
import { createTopic, updateTopic, deleteTopic } from './topic.controller';
import { Topic } from './topic.domain';

describe(getTestFileName(), () => {
  beforeEach(async () => {
    await clearDb(knex);
  });

  const app = build();

  describe(createTopic.name, () => {
    test('creates a new topic returns 200', async () => {
      const topic = CreateTopicDtoFactory.build();
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/topic',
        payload: {
          ...topic,
        },
      });

      expect(response.statusCode).toBe(200);
    });

    test('creates a new topic is saved properly', async () => {
      const topic = CreateTopicDtoFactory.build();
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/topic',
        payload: {
          ...topic,
        },
      });
      const { id } = response.json<Topic>();

      const savedTopic = await knex<TopicDb>('topic')
        .select('*')
        .where('id', id)
        .first();

      expect(savedTopic?.id).toBe(id);
    });
  });

  describe(updateTopic.name, () => {
    test('updates a topic returns 204', async () => {
      const topic = TopicFactory.build();
      await knex<TopicDb>('topic').insert(topic);

      const response = await app.inject({
        method: 'PATCH',
        url: `/api/v1/topic/${topic.id}`,
        payload: {
          name: 'different',
        },
      });

      expect(response.statusCode).toBe(204);
    });

    test('delete a topic is marked as soft deleted', async () => {
      const topic = TopicFactory.build();
      await knex<TopicDb>('topic').insert(topic);

      await app.inject({
        method: 'PATCH',
        url: `/api/v1/topic/${topic.id}`,
        payload: {
          name: 'different',
        },
      });

      const savedTopic = await knex<TopicDb>('topic')
        .select('*')
        .where('id', topic.id)
        .first();

      expect(savedTopic?.name).toBe('different');
    });

    test('deletes an non existent topic results in 404', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: `/api/v1/topic/${uuidv4()}`,
        payload: {
          name: 'different',
        },
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe(deleteTopic.name, () => {
    test('deletes an existing topic returns 204', async () => {
      const topic = TopicFactory.build();
      await knex<TopicDb>('topic').insert(topic);

      const response = await app.inject({
        method: 'DELETE',
        url: `/api/v1/topic/${topic.id}`,
      });

      expect(response.statusCode).toBe(204);
    });

    test('deletes an existing topic is saved properly', async () => {
      const topic = TopicFactory.build();
      await knex<TopicDb>('topic').insert(topic);

      await app.inject({
        method: 'DELETE',
        url: `/api/v1/topic/${topic.id}`,
      });

      const savedTopic = await knex<TopicDb>('topic')
        .select('*')
        .where('id', topic.id)
        .first();

      expect(savedTopic?.isDeleted).toBeTruthy();
    });

    test('updates an non existent topic results in 404', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: `/api/v1/topic/${uuidv4()}`,
      });

      expect(response.statusCode).toBe(404);
    });
  });
});
