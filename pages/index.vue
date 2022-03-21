<template>
  <div>
    <v-app-bar elevate-on-scroll dense>
      <v-app-bar-title>NuxtJS simple gallery</v-app-bar-title>
    </v-app-bar>
    <div class="layout">
      <ImageCard v-for="image in images" :key="image.id" :imgId="image.id" :title="image.title" :thumbUrl="image.thumbnailUrl"/>
      <v-btn @click="getMore">Загрузить еще</v-btn>
      <!--infinite-loading 
        spinner="spiral"
        @infinite="notEnouhth" 
      ></infinite-loading-->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'


export default Vue.extend({
  head: {
    title: "Vue 2 + Nuxt gallery"
  },

  methods: {
    ...mapActions({
      getMore: 'getMore'
    }),

    notEnouhth() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.$store.dispatch('getMore')
        }
      }
    }
  },
  computed: {
    ...mapGetters(["images"])
  },
  async fetch() {
    await this.getMore()
  }
})
</script>

<style scoped>
    .layout{
        display: grid;
        gap: 1em;
        grid-template-columns: repeat(auto-fit, minmax(10em, 20em));
        justify-content: center;
    }    
</style>