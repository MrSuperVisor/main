export const state = () => ({
    imageDetails: []
})
  
export const mutations = {
    pushDetails(state, someDetails) {    
        state.imageDetails.push(someDetails)
    }
}

export const actions = {
    addComputedDetails: (context) => (details) => {
        console.log('campute blyad im')
        context.commit('pushDetails', details)
    }
}

export const getters = {
    getDetails (state) {
        return state.imageDetails
    },
    getDetailsByID: (state) => (id) => {
        console.log('hera im')
        console.log(state.imageDetails)
        return state.imageDetails.filter(elem => elem.id == id)[0]
    }
}