import callsites from 'callsites';
import { Knex } from 'knex';
import { clean } from 'knex-cleaner';

const getTestName = (filePath: string | null) => {
  const matches = filePath
    ?.match(/[\w\.]+\.test\.ts/)?.[0]
    .replace('.test.ts', '');

  return matches ?? 'unknown';
};
export const getTestFileName = (): string => {
  const sites = callsites();
  return sites.length > 2 ? getTestName(sites[1].getFileName()) : 'unknown';
};

export const clearDb = (knex: Knex): Promise<void> => clean(knex);
