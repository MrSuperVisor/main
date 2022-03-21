<template>
  <v-app dark class="space">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      К безопасности.
    </NuxtLink>
  </v-app>
</template>

<script>

export default {
  name: 'EmptyLayout',
  //layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Page no found',
      otherError: 'Some bugs found'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },

  mounted: () => {
        setTimeout(() => {
            this.$router.replace({path: '/'})
        }, 3000);
        
    }
}
</script>

<style scoped>
.space {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 20px;
}
</style>
