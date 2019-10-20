const envalid = require('envalid');

const { cleanEnv, str, port } = envalid;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: str({ desc: 'The MongoDB connection URL.' }),
  PORT: port({ desc: 'The internal port to run on.', default: 80 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 80 }),
});
