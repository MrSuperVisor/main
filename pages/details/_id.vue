<template>  
  <div>
    <v-app-bar elevate-on-scroll dense>
      <v-app-bar-title>NuxtJS simple gallery</v-app-bar-title>
    </v-app-bar>
    <v-container md-12>
      
      <v-row>
        <v-col col-6>
          <v-img :lazy-src="imageDetails.imgLazy" :src="imageDetails.imgHref"/>
        </v-col>
        <v-col col-12>
          <h2>{{imageDetails.imgTitle}}</h2>
          <h5 >альбом: {{imageDetails.albumName}}</h5>
          <h4>Автор: {{imageDetails.authorName}}</h4>
          <v-btn @click="goBack">Назад</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      title: `Изображение №${this.$route.params.id}`
    }
  },
  data() {
      return {
          imageDetails: {
              id: this.$route.params.id,
              imgTitle: "",
              imgHref: "",
              imgLazy:"",
              albumId: null,
              albumName: "",
              userId: null,
              authorName: ""
      }}
  },

  async fetch() {
    const imd = this.imageDetails
    const main = this.$store.getters['getImageByID'](imd.id) || 
        (await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?id=${imd.id}`)).data[0]
    this.imageDetails =  {...this.imageDetails, imgHref: main.url, imgLazy: main.thumbnailUrl, albumId: main.albumId, imgTitle: main.title}
    const details = (await this.$axios.get(`https://jsonplaceholder.typicode.com/albums?id=${this.imageDetails.albumId}`)).data[0]
    this.imageDetails =  {...this.imageDetails, userId: details.userId, albumName: details.title}
    this.imageDetails.authorName = (await this.$axios.get(`https://jsonplaceholder.typicode.com/users?id=${this.imageDetails.userId}`)).data[0].name
    
  },
  
  methods: {
    goBack() {
      this.$router.go(-1)
    }
      
  }

})
</script>