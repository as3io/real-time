const mongoose = require('mongoose');
const env = require('../env');

const { MONGO_DSN } = env;

module.exports = mongoose.createConnection(MONGO_DSN, {
  // autoIndex: env.NODE_ENV !== 'production',
  bufferMaxEntries: 0, // Default -1
  ignoreUndefined: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
