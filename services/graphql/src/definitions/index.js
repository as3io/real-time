const gql = require('graphql-tag');
const story = require('./story');

module.exports = gql`

scalar Date
scalar ObjectID

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

type Subscription {
  ping: String!
}

enum SortDirectionEnum {
  asc
  desc
}

${story}

`;
