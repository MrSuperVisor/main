import Vue from 'vue'

export default ({ $axios, redirect, app }, inject) => {
    $axios.onError((error) => {
      if (error.response === undefined) {
        // Display a flash notification
        Vue.notify({
          title: 'Network Error: Please refresh and try again.',
          type: 'error',
          duration: -1,
        })
  
        throw error
      }
  
      // Handle other types of errors (e.g., redirect to login on 401 errors)
  
      throw error
    })
  }