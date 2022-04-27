import Vue from 'vue'
import App from './App.vue'
import { ApolloClient, HttpLink, InMemoryCache, split } from 
'apollo-boost'
import VueApollo from 'vue-apollo'
import router from './router'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import vuetify from './plugins/vuetify'
import store from '@/store/index.js'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri : 'https://weekly-task-vue-levy.hasura.app/v1/graphql',
})

const wsLink = new WebSocketLink({
  uri:'wss://weekly-task-vue-levy.hasura.app/v1/graphql',
  options: {
      reconnect: true,
  }
});

const link = split(
  ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind == 'OperationDefinition' && definition.operation == 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo)

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')