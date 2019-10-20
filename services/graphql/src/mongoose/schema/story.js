const { Schema } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
  },
});

module.exports = schema;
