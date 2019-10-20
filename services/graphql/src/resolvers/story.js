const Story = require('../mongoose/models/story');

module.exports = {
  /**
   *
   */
  Mutation: {
    createStory: (_, { input }) => {
      const { title, body } = input;
      return Story.create({ title, body });
    },
  },

  /**
   *
   */
  Query: {
    story: (_, { input }) => Story.findById(input.id),
  },
};
