<template>  
  <div>
    <v-app-bar elevate-on-scroll dense>
      <v-app-bar-title>NuxtJS simple gallery</v-app-bar-title>
    </v-app-bar>
    <v-container v-show="details.author != undefined" md-12>
      <v-row>
        <v-col col-6>
          <v-img :lazy-src="details.thumbnailUrl" :src="details.url"/>
        </v-col>
        <v-col col-12>
          <h2 v-if="details != undefined">{{details.title}}</h2>
          <h5 v-if="details.album != undefined">альбом: {{details.album.title}}</h5>
          <h4 v-if="details.author != undefined">Автор: {{details.author.name}}</h4>
          <v-btn @click="goBack">Назад</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  head() {
    return {
      title: `Изображение №${this.$route.params.id}`
    }
  },
  data() {
    return {
      details: {}
    }
  },
  methods: {
    ...mapActions(["fillPhotoDetails"]),

    goBack() {
        this.$router.push({path: '/'})
      }
    
      
  },

  async fetch() {
    if (this.$route.params.id) {
      await this.fillPhotoDetails(this.$route.params.id)
      this.details = await this.$store.getters['getImageByID'](this.$route.params.id)
    } else {
      return this.$nuxt.error({ statusCode: 404, message: 'PageNotFound'})
    }
  },
  
})
</script>