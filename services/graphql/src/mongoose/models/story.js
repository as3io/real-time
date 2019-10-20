const log = require('fancy-log');
const { green } = require('chalk');

const pubsub = require('../../pubsub');
const connection = require('../connection');
const schema = require('../schema/story');
const { STORY_CREATED } = require('../../change-events');

const Story = connection.model('story', schema, 'stories');

Story.watch().on('change', (data) => {
  // @todo Is it possible there could be race-like conditions with many updates?
  // op types: insert, update, delete
  const { operationType } = data;
  if (operationType === 'insert') {
    log('Story created', data.fullDocument);
    pubsub.publish(STORY_CREATED, { storyCreated: data.fullDocument });
  } else {
    log('Story change', green(data.operationType), data);
  }
});

module.exports = Story;
