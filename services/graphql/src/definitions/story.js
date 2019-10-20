const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  story(input: StoryQueryInput!): Story
}

extend type Mutation {
  createStory(input: CreateStoryMutationInput!): Story!
  updateStoryTitle(input: UpdateStoryTitleInput!): Story!
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

input StoryQueryInput {
  id: ObjectID!
}

input UpdateStoryTitleInput {
  id: ObjectID!
  value: String
}

`;
