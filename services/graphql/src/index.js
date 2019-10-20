const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const { PORT, EXPOSED_PORT } = require('./env');
const express = require('./express');
const pkg = require('../package.json');
const services = require('./services');

const { log } = console;
const server = http.createServer(express);

const run = async () => {
  await services.start();

  createTerminus(server, {
    timeout: 1000,
    signals: ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
    healthChecks: { '/_health': () => services.ping() },
    onSignal: () => {
      log('> Cleaning up...');
      return services.stop().catch((e) => log('> CLEANUP ERRORS:', e));
    },
    onShutdown: () => log('> Cleanup finished. Shutting down.'),
  });

  server.listen(PORT, () => log(`> Ready on http://0.0.0.0:${EXPOSED_PORT}`));
};

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

log(`> Booting ${pkg.name} v${pkg.version}...`);
run().catch((e) => setImmediate(() => { throw e; }));
