import VueApollo from 'vue-apollo';
import createApolloClient from './create-client';

export default ({ uri, subscriptionsUri } = {}) => {
  if (!origin || !subscriptionsUri) {
    throw new Error('The uri and subscriptionsUri options are required to create the Apollo Provider.');
  }
  return new VueApollo({
    defaultClient: createApolloClient({ uri, subscriptionsUri }),
  });
};
