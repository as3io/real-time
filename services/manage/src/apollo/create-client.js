import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { name, version } from '../../package.json';

export default ({ uri, subscriptionsUri, headers }) => {
  const httpLink = createHttpLink({
    uri,
    headers,
  });

  const wsLink = new WebSocketLink({
    uri: subscriptionsUri,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    name,
    version,
    link,
    cache: new InMemoryCache(),
  });
};
