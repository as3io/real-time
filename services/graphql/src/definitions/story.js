const gql = require('graphql-tag');

module.exports = gql`

type Story {
  id: ObjectID!
  title: String
  body: String
}

`;
