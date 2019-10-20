const log = require('fancy-log');
const connection = require('../connection');
const schema = require('../schema/story');

const Story = connection.model('story', schema, 'stories');

Story.watch().on('change', (data) => {
  // @todo Is it possible there could be race-like conditions with many updates?
  log('Story change', data);
});

module.exports = Story;
