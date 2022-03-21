<template>
  <div dark class="space">
    <h1>
      Page not found
    </h1>
    <NuxtLink to="/">
      Retun to main
    </NuxtLink>
  </div>
</template>

<scriptlang="ts">
import Vue from 'vue'

export default Vue.extend({
    mounted: () => {
        setTimeout(() => {
            this.$router.replace({path: '/'})
        }, 3000);
        
    }
})
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