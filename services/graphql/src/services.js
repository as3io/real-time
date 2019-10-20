const log = require('fancy-log');
const { green, gray } = require('chalk');
const mongoose = require('./mongoose/connection');
const pkg = require('../package.json');

module.exports = {
  start: async () => {
    const m = await mongoose;
    log(`Database ${green('connected')} on ${gray(m.client.s.url)}`);
  },
  ping: async () => {
    const args = [{ _id: pkg.name }, { $set: { last: new Date() } }, { upsert: true }];
    await Promise.all([
      mongoose.db.command({ ping: 1 }),
      mongoose.db.collection('pings').updateOne(...args),
    ]);
    return 'MongoDB ping successfully.';
  },
  stop: async () => {
    await mongoose.close();
    log('Database disconnected');
  },
};
