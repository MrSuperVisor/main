export const state = () => ({
  images: [],
  currentPage: 1
  })
  
  export const mutations = {
    incrementPage(state) {
        state.currentPage++
    },

    addImages(state, someImages) {    
        state.images=state.images.concat(someImages)
    }
}

export const actions = {
    async initiateGet(context) {
      var newPart = (await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${context.state.currentPage}`)).data
      context.commit('incrementPage')
      newPart = newPart.concat((await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${context.state.currentPage}`)).data)
      context.commit('incrementPage')
      newPart = newPart.concat((await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${context.state.currentPage}`)).data)
      context.commit('addImages', newPart)
      context.commit('incrementPage')
    },
    async getMore(context) {
        const newPart = (await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${context.state.currentPage}`)).data
        context.commit('addImages', newPart)
        context.commit('incrementPage')
    }

}

export const getters = {
    getImages (state) {
        return state.images
    },

    getImageByID: (state) => (id) => {
        return state.images.filter(img => img.id === id)[0]
    }
}