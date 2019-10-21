const pubsub = require('../pubsub');
const { STORY_CREATED, STORY_DELETED } = require('../change-events');
const Story = require('../mongoose/models/story');
const notFound = require('../errors/not-found');
const applyCollation = require('../utils/apply-collation');
const applySort = require('../utils/apply-sort');

module.exports = {
  /**
   *
   */
  Subscription: {
    storyCreated: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => {
        console.log('storyCreated subscribe');
        return pubsub.asyncIterator([STORY_CREATED]);
      },
    },
    storyDeleted: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => {
        console.log('storyDeleted subscribe');
        return pubsub.asyncIterator([STORY_DELETED]);
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

    stories: (_, { input }) => {
      const { limit, skip, sort } = input;
      const options = {
        limit,
        skip,
        sort: applySort(sort),
        collation: applyCollation(sort),
      };
      return Story.find({}, null, options);
    },
  },
};
