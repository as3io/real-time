const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  story(input: StoryQueryInput!): Story
}

extend type Mutation {
  createStory(input: CreateStoryMutationInput!): Story!
  updateStoryTitle(input: UpdateStoryTitleInput!): Story!
  deleteStory(input: DeleteStoryInput!): String
}

type Story {
  id: ObjectID!
  title: String
  body: String
}

input CreateStoryMutationInput {
  title: String
  body: String
}

input DeleteStoryInput {
  id: ObjectID!
}

input StoryQueryInput {
  id: ObjectID!
}

input UpdateStoryTitleInput {
  id: ObjectID!
  value: String
}

`;
