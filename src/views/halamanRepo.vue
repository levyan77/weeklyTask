<template>
<div>
  <ApolloQuery
    :query="gql => gql`
        query MyQuery($id: Int!) {
        repotugas_by_pk(id: $id) {
            title
            isirepotugas {
            linkpraktikum
            screenshoots
            summary
            task
            }
        }
        }

    `"
    :variables="{id: RepoID}"
  >
    <template v-slot="{ result: { loading, error, data } }">
    <!-- Loading -->
    <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
    <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
    <div v-else-if="data" class="result apollo">

        <h1>
            {{ data.repotugas_by_pk.title }}
        </h1>

        <div v-for="isi in data.repotugas_by_pk.isirepotugas" :key="isi.id">
            <a v-if="isi.linkpraktikum" :href= "isi.linkpraktikum">Link Praktikum</a> 
            <div v-if="isi.summary">
                {{isi.summary}}    
            </div>
        </div>

        <div v-for="task in data.repotugas_by_pk.isirepotugas" :key="task.id">
            <div v-if="task.task">
                {{task.task}}
            </div>
        </div>



        <div v-for="gambar in data.repotugas_by_pk.isirepotugas" :key="gambar.id">
            <v-card class="mx-auto" max-width="700">
                <v-img v-if="gambar.screenshoots" :src="gambar.screenshoots"></v-img>
            </v-card>


                <!-- <v-carousel v-model="model" v-if="gambar.screenshoots">
                    <v-carousel-item
                    v-for="item in gambar"
                    :key="item.id"
                    >
                    <v-sheet
                        height="100%"
                        tile
                    >
                        <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                        >
                        <div class="text-h2">
                            {{item}}
                        </div>
                        </v-row>
                    </v-sheet>
                    </v-carousel-item>
                </v-carousel> -->

        </div>
        
    </div>

      <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
    </template>

  </ApolloQuery>        
</div>
</template>
<script>
export default {
    data(){
        return{
            idRepo: 1,
            model: 0,
            colors: [
                'primary',
                'secondary',
                'yellow darken-2',
                'red',
                'orange',
            ],
        }
    },
    computed:{
        RepoID(){
            return this.$store.state.page
        }
    }
}
</script>