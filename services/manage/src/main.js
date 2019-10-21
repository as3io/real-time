import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import createProvider from './apollo/create-provider';

Vue.use(VueApollo);
Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider({ uri: 'http://localhost:17420' }),
  render: h => h(App),
}).$mount('#app');
