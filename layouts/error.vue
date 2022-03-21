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
      pageNotFound: 'Упс, промазали.',
      otherError: 'Баги на багах багами погоняют'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.space {
  height: 100%;
}
h1 {
  font-size: 20px;
}
</style>
