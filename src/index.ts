import express from 'express';
import { log } from 'fp-ts/lib/Console';
import http from 'http';
import { router as questionRouter } from './question';

const app = express();

// eslint-disable-next-line fp/no-unused-expression
app.use('/api/v1/question', questionRouter);

const httpServer = http.createServer(app);
// eslint-disable-next-line fp/no-unused-expression
httpServer.listen(8080, () => log('server listening on port 8080')());
