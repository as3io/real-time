const log = require('fancy-log');
const { green } = require('chalk');

const pubsub = require('../../pubsub');
const connection = require('../connection');
const schema = require('../schema/story');
const { STORY_CREATED, STORY_DELETED } = require('../../change-events');

const Story = connection.model('story', schema, 'stories');

Story.watch().on('change', async (data) => {
  // @todo Is it possible there could be race-like conditions with many updates?
  // op types: insert, update, delete
  const { operationType } = data;
  if (operationType === 'insert') {
    const { fullDocument } = data;
    // @todo This is re-querying for the mongoose object...
    // The resolver should likely handle this to support automatic projection?
    const story = await Story.findById(fullDocument._id);
    log('Story created', fullDocument, story);
    pubsub.publish(STORY_CREATED, { storyCreated: story });
  } else if (operationType === 'delete') {
    const { documentKey } = data;
    log('Story deleted', documentKey._id);
    pubsub.publish(STORY_DELETED, { storyDeleted: documentKey._id });
  } else {
    log('Story change', green(data.operationType), data);
  }
});

module.exports = Story;
