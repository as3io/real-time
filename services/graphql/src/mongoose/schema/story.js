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

schema.index({ title: 1 }, { collation: { locale: 'en_US' } });

module.exports = schema;
