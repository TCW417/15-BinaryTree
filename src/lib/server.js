import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger';
import treeRouter from '../router/tree-router';
import init from '../main';

// middleware
import errorMiddleWare from '../lib/middleware/error-middleware';
import loggerMiddleware from '../lib/middleware/logger-middleware';

const app = express();
const PORT = process.env.PORT || 3000;
let server = null;

// third party apps
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// our own modules
app.use(loggerMiddleware);

app.use(treeRouter);

app.use(errorMiddleWare);

// catch all
app.all('*', (request, response) => {
  logger.log(logger.ERROR, 'Server returning a 404 from the catch/all route');
  return response.sendStatus(404).send('Route Not Registered');
});

console.log('SERVER: before declaration of startServer');
const startServer = () => {
  console.log('STARTSERVER connecting to mongoose');
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('STARTSERVER: calling init()');
      return init();
    })
    .then(() => {
      // console.log('STARTSERVER: calling app.listen');
      server = app.listen(PORT, () => {
        logger.log(logger.INFO, `Server up on port ${PORT}`);
      });
      console.log('SERVER: after app.listen call, typeof server', typeof server);
    })
    .catch((err) => {
      throw err;
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server stopped');
      });
    })
    .catch((err) => {
      throw err;
    });
};
export { startServer, stopServer };

console.log('SERVER: typeof startServer', typeof startServer);

