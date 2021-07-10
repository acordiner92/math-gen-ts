import { FastifySchemaCompiler } from 'fastify';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';

export const validatorCompiler =
  <T>(): FastifySchemaCompiler<t.Type<T>> =>
  ({ schema }) =>
  (data: unknown) =>
    pipe(
      data,
      schema.decode,
      E.mapLeft(failure),
      E.foldW(
        error => ({ error: new Error(error.join(', ')) }),
        value => ({ value }),
      ),
    );
