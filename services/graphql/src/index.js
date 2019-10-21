const { createTerminus } = require('@godaddy/terminus');
const log = require('fancy-log');
const {
  green,
  cyan,
  yellow,
  gray,
} = require('chalk');
const { PORT, EXPOSED_PORT } = require('./env');
const pkg = require('../package.json');
const services = require('./services');
const { httpServer, apolloServer } = require('./server');

const run = async () => {
  await services.start();

  createTerminus(httpServer, {
    timeout: 1000,
    signals: ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
    healthChecks: { '/_health': () => services.ping() },
    onSignal: () => {
      log('Cleaning up...');
      return services.stop().catch((e) => log('CLEANUP ERRORS:', e));
    },
    onShutdown: () => log('Cleanup finished. Shutting down.'),
  });

  const url = `http://0.0.0.0:${EXPOSED_PORT}${apolloServer.graphqlPath}`;
  const ws = `ws://0.0.0.0:${EXPOSED_PORT}${apolloServer.subscriptionsPath}`;
  httpServer.listen(PORT, () => log(`Server ${green('ready')} on ${yellow(url)} (subscriptions: ${gray(ws)})`));
};

process.on('unhandledRejection', (e) => {
  log('Unhandled promise rejection. Throwing error...');
  throw e;
});

log(`Booting ${cyan(pkg.name)} v${pkg.version}...`);
run().catch((e) => setImmediate(() => { throw e; }));
