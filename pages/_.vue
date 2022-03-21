<template>
  <div dark class="space">
    <h1>
      Page not found in whole app!
    </h1>
    <!--h1 v-else>
      {{ otherError }}
    </h1-->
    <!--v-btn @click="goBack">К безопасности.</v-btn-->
    <NuxtLink to="/">
      Retun to main
    </NuxtLink>
  </div>
</template>

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