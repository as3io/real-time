const pubsub = require('../pubsub');
const { STORY_CREATED } = require('../change-events');
const Story = require('../mongoose/models/story');
const notFound = require('../errors/not-found');

module.exports = {
  /**
   *
   */
  Subscription: {
    storyCreated: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => {
        console.log('subscribe');
        return pubsub.asyncIterator([STORY_CREATED]);
      },
    },
  },

  /**
   *
   */
  Mutation: {
    createStory: (_, { input }) => {
      const { title, body } = input;
      return Story.create({ title, body });
    },

    deleteStory: async (_, { input }) => {
      await Story.deleteOne({ _id: input.id });
      return 'ok';
    },

    updateStoryTitle: async (_, { input }) => {
      const { id, value } = input;
      // @todo how should projection be handled here.
      // @todo should this even pre-query?
      const story = await Story.findById(id);
      if (!story) throw notFound(`No story was found for ID ${id}`);
      story.title = value;
      return story.save();
    },
  },

  /**
   *
   */
  Query: {
    story: (_, { input }) => Story.findById(input.id),
  },
};
