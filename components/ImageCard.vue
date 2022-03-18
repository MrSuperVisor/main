<template>
    <v-card @click="routeTo" flex-shrink-1 elevation="5" class="box">
        <img :src="thumbUrl">
        <v-card-text>{{title}}</v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class ImageCard extends Vue {
  @Prop(String) readonly title: string | undefined
  @Prop(String) readonly thumbUrl: string | undefined
  @Prop(Number) readonly imgId: number | undefined
  @Emit()
    routeTo() {
        this.$router.push(`/details/${this.imgId}`)
    }
    
}

</script>

<style scoped>
    .box{
        display: flex;
        flex-direction: column;
        margin: 10px;        
        transition: .3s;
    }

    .box:hover {
        transform: scale(1.07);
    }
</style>