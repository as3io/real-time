const log = require('fancy-log');
const connection = require('../connection');
const schema = require('../schema/story');

const Story = connection.model('story', schema, 'stories');

Story.watch().on('change', (data) => {
  log('Story change', data);
});

module.exports = Story;
