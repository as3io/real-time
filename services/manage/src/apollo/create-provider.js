import VueApollo from 'vue-apollo';
import createApolloClient from './create-client';

export default ({ uri } = {}) => {
  if (!uri) {
    throw new Error('The uri option is required to create the Apollo Provider.');
  }
  return new VueApollo({
    defaultClient: createApolloClient({ uri }),
  });
};
