const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('../schema');

const app = express();

const server = new ApolloServer({
  schema,
  ontext: async ({ req }) => {
    // Simulate a logged-in user.
    const userEmail = req.get('x-user-email');
    return { userEmail };
  },
});

server.applyMiddleware({ app, path: '/' });

module.exports = app;
