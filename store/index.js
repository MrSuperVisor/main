export const state = () => ({
  images: [],
  albums: [],
  authors: [],
  currentPage: 1
  })
  
  export const mutations = {
    incrementPage(state) {
        state.currentPage++
    },

    addImages(state, someImages) {    
        state.images=state.images.concat(someImages)
    },

    addAlbum(state, someAlbum) {    
        state.albums=state.albums.concat(someAlbum)
    },

    addAuthor(state, someAuthor) {    
        state.authors=state.authors.concat(someAuthor)
    }
}

export const actions = {

    async getMore(context) {
        const newPart = (await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${context.state.currentPage}`)).data
        context.commit('addImages', newPart)
        context.commit('incrementPage')
    },

    async loadOneImage(context,id) {
        const newPart = (await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?id=${id}`)).data
        context.commit('addImages', newPart)
    },

    async loadOneAlbum(context,id) {
        const newAlbum = (await this.$axios.get(`https://jsonplaceholder.typicode.com/albums?id=${id}`)).data
        context.commit('addAlbum', newAlbum)
    },

    async loadOneAuthor(context,id) {
        const newAuthor = (await this.$axios.get(`https://jsonplaceholder.typicode.com/users?id=${id}`)).data
        context.commit('addAuthor', newAuthor)
    },

    async fillPhotoDetails(context,id) {
        var img = context.state.images.filter(el => el.id == id)[0]

        if (!img) {
            const newPart = (await this.$axios.get(`https://jsonplaceholder.typicode.com/photos?id=${id}`)).data
            context.commit('addImages', newPart) 
            img = newPart[0]
            const f = 1/0
        }

        var album = context.state.albums.filter(el => el.id == img.albumId)[0]
        if (!album) {
            const newAlbum = (await this.$axios.get(`https://jsonplaceholder.typicode.com/albums?id=${img.albumId}`)).data
            context.commit('addAlbum', newAlbum)
            album = newAlbum[0]
        }

        var author = context.state.authors.filter(el => el.id == album.userId)[0]
        if (!author) {
            const newAuthor = (await this.$axios.get(`https://jsonplaceholder.typicode.com/users?id=${album.userId}`)).data
            context.commit('addAuthor', newAuthor)
        }
        
    }
}

export const getters = {
    images (state) {
        return state.images
    },

    getImageByID: (state) => (id) => {
        const imgDetails=state.images.filter(img => img.id == id)[0]
        imgDetails.album=state.albums.filter(album => album.id == imgDetails.albumId)[0]
        imgDetails.author=state.authors.filter(author => author.id == imgDetails.album.userId)[0]
        return imgDetails
    }
}