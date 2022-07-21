<template>
<div>
  <ApolloQuery
    :query="gql => gql`
        query MyQuery($id: Int!) {
        repotugas_by_pk(id: $id) {
            id
            title
            isirepotugas {
            id
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

        
        <div v-for="link in data.repotugas_by_pk.isirepotugas" :key="link.id" class="mt-5"> 
            <div v-if="link.linkpraktikum">
                <v-chip
                color="orange"
                link
                :href="link.linkpraktikum"
                >Link Praktikum</v-chip>  
            </div>
        </div>
        
        <div class="mt-5">
            <h2>Summary</h2>
            <div v-for="isi in data.repotugas_by_pk.isirepotugas" :key="isi.id"> 
                <div v-if="isi.summary">
                    <ul>
                        <li>{{isi.summary}}</li>
                    </ul>  
                </div>
            </div>
        </div>



        <div v-if="data.repotugas_by_pk.id == 8 ||
             data.repotugas_by_pk.id == 9
             ||
             data.repotugas_by_pk.id == 10
             ||
             data.repotugas_by_pk.id == 11
             ||
             data.repotugas_by_pk.id == 18
             ||
             data.repotugas_by_pk.id == 19
             ||
             data.repotugas_by_pk.id == 21
             ">
            <div class="mt-5">
                <h2>Task</h2>
                <div v-for="task in data.repotugas_by_pk.isirepotugas" :key="task.id">
                    <div v-if="task.task">
                        <ul>
                            <li>{{task.task}}
                                <v-card class="mx-auto mb-6" max-width="1200">
                                    <v-img v-if="task.screenshoots " :src="task.screenshoots"></v-img>
                                </v-card>
                            </li>
                        </ul>  
                    </div>
                </div>
            </div>

        </div>

        <div v-else>
            <div class="mt-5">
                <h2>Task</h2>
                <div v-for="task in data.repotugas_by_pk.isirepotugas" :key="task.id">
                    <div v-if="task.task">
                        <ul>
                            <li>{{task.task}}</li>
                        </ul>  
                    </div>
                </div>
            </div>


            <div v-for="gambar in data.repotugas_by_pk.isirepotugas" :key="gambar.id" class="mt-5" >
                <v-card class="mx-auto" max-width="1200">
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