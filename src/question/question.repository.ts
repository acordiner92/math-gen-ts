// import pool from '../data/pgPool';
// import type * as s from 'zapatos/schema';
// import * as TE from 'fp-ts/TaskEither';
// import { pipe } from 'fp-ts/function';

// export const create = (
//   question: s.question.Insertable,
// ): TE.TaskEither<Error, s.question.JSONSelectable[]> =>
//   pipe(
//     TE.tryCatch(
//       () => db.insert('question', [question]).run(pool),
//       () => new Error('Failed to insert question into the database'),
//     ),
//   );
