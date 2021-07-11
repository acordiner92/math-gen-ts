import { build } from './app';

const port = 8080;
const server = build({
  logger: true,
});

// eslint-disable-next-line fp/no-unused-expression
void server.listen(port);
