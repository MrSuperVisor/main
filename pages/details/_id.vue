<template>  
  <div>
    <v-app-bar elevate-on-scroll dense>
      <v-app-bar-title>NuxtJS simple gallery</v-app-bar-title>
    </v-app-bar>
    <v-container md-12>
      <v-row>
        <v-col col-6>
          <v-img :lazy-src="imageDetails.thumbnailUrl" :src="imageDetails.url"/>
        </v-col>
        <v-col col-12>
          <h2 v-if="imageDetails != undefined">{{imageDetails.title}}</h2>
          <h5 v-if="imageDetails.album != undefined">альбом: {{imageDetails.album.title}}</h5>
          <h4 v-if="imageDetails.author != undefined">Автор: {{imageDetails.author.name}}</h4>
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
  methods: {
    ...mapActions(["fillPhotoDetails"]),

    goBack() {
      if (this.$nuxt.context.from?.path == "/") {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
      
  },
  computed: {
    imageDetails: function() {
      if (this.$route.params.id) {
        return this.$store.getters['getImageByID'](this.$route.params.id)
      } else {
        return this.$nuxt.error({ statusCode: 404})
      }
    }
    
  },

  async fetch() {
    if (this.$route.params.id) {
      await this.fillPhotoDetails(this.$route.params.id)           
    } else {
      return this.$nuxt.error({ statusCode: 404})
    }
  },
  
})
</script>