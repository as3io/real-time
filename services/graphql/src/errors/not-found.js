const { ApolloError } = require('apollo-server-express');

module.exports = (message, properties) => new ApolloError(message, 'RECORD_NOT_FOUND', properties);
