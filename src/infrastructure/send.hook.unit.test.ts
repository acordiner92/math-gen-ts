/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import { sendHook } from '.';
import { getTestFileName } from '../../test';

describe(getTestFileName(), () => {
  describe(sendHook.name, () => {
    test.each(['', null, undefined, '{"_tag":"Right"}'])(
      'returns no content if payload is empty',
      async payload => {
        const sendNoContentMock = jest.fn();
        await sendHook(payload, sendNoContentMock);
        expect(sendNoContentMock.mock.calls.length).toBe(1);
      },
    );

    test.each(['value', '0', '{"name":"test"}'])(
      'returns payload if its not empty is',
      async payload => {
        const sendNoContentMock = jest.fn();
        await expect(
          sendHook(payload, sendNoContentMock),
        ).resolves.toStrictEqual(payload);
      },
    );
  });
});
