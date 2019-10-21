const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  story(input: StoryQueryInput!): Story
  stories(input: StoriesQueryInput = {}): [Story!]!
}

extend type Mutation {
  createStory(input: CreateStoryMutationInput!): Story!
  updateStoryTitle(input: UpdateStoryTitleInput!): Story!
  deleteStory(input: DeleteStoryInput!): String
}

extend type Subscription {
  storyCreated: Story!
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

input DeleteStoryInput {
  id: ObjectID!
}

input StoriesQueryInput {
  limit: Int = 10
  skip: Int
  sort: StorySortInput = {}
}

input StoryQueryInput {
  id: ObjectID!
}

input StorySortInput {
  field: StorySortFieldEnum = _id
  order: SortDirectionEnum = asc
}

input UpdateStoryTitleInput {
  id: ObjectID!
  value: String
}

`;
