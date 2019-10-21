const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  story(input: QueryStoryInput!): Story
  stories(input: QueryStoriesInput = {}): [Story!]!
}

extend type Mutation {
  createStory(input: CreateStoryMutationInput!): Story!
  updateStoryTitle(input: UpdateStoryTitleMutationInput!): Story!
  deleteStory(input: DeleteStoryMutationInput!): String
}

extend type Subscription {
  storyCreated: Story!
  storyDeleted: ObjectID!
}

enum StorySortFieldEnum {
  _id
  title
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

input DeleteStoryMutationInput {
  id: ObjectID!
}

input QueryStoriesInput {
  limit: Int = 10
  skip: Int
  sort: StorySortInput = {}
}

input QueryStoryInput {
  id: ObjectID!
}

input StorySortInput {
  field: StorySortFieldEnum = _id
  order: SortDirectionEnum = asc
}

input UpdateStoryTitleMutationInput {
  id: ObjectID!
  value: String
}

`;
