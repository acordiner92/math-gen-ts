/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import { v4 as uuidv4 } from 'uuid';
import { mapToErrorResponse } from '.';
import { getTestFileName } from '../../test';
import { ResourceNotFound } from '../common';

describe(getTestFileName(), () => {
  describe(mapToErrorResponse.name, () => {
    test('ResourceNotFound error maps to 404 response', () => {
      expect(
        mapToErrorResponse(new ResourceNotFound(uuidv4(), 'Cannot find topic')),
      ).toStrictEqual({
        message: 'Cannot find topic',
        type: 'ResourceNotFound',
        statusCode: 404,
      });
    });

    test('Unknown error maps to 500 response', () => {
      expect(
        mapToErrorResponse(new Error('Some uncaught error has occurred')),
      ).toStrictEqual({
        message: 'An internal server error occured',
        type: 'InternalServiceError',
        statusCode: 500,
      });
    });
  });
});
