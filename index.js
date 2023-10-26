const mongoose = require('mongoose');
const app = require('./src/app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');
const { setJob } = require('./src/scheduler/setJob');
const { LoadCache, dbCache } = require('./src/service/cache.service');

let server;

mongoose.connect('mongodb://localhost:27017').then(() => {
  logger.info('Connected to MongoDB');
  // LoadCache().then(()=>logger.info('Cache Loaded'));
 // setJob();
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
