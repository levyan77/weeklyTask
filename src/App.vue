<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://www.alterra.id/wp-content/uploads/2020/02/academy.png"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/levyan77/vue_achmad-pahlevy-aminullah-nizaruddin"
        target="_blank"
        text
      >
        <span class="mr-2">Repo Tugas</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <ApolloQuery
              :query="gql => gql`
                query MyQuery {
                  repotugas {
                    id
                    title
                  }
                }

              `"
            >
              <template v-slot="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
              <div v-else-if="error" class="error apollo">An error occurred</div>

                <!-- Result -->
              <div v-else-if="data" class="result apollo">
                <v-list-item v-for="item in data.repotugas" :key="item.id" @click="press(item.id)">
                  <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item>
              </div>
              <div v-else class="no-result apollo">No result :(</div>
              </template>

            </ApolloQuery>

            </v-list-item-group>
          </v-list>
      </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
  }),

  methods:{
    press(param){
      this.$store.commit("setPage",param)
    }
  },

  watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>
