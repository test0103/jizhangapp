import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    bookType:'',
    bookId:"",
    isShow1:0,
    isShow2:0,
    isShow3:0,
    isShow4:0,
}

const mutations = {
    setBookType (state, bookType) {
        console.log(bookType);
        
        state.bookType = bookType
    },
    setBookId (state, bookId) {
        console.log(bookId);
        
        state.bookId = bookId
    },
    setisShow1 (state, isShow1) {
        
        state.isShow1 = isShow1
        localStorage.setItem('isShow1',isShow1)
    },
    setisShow2 (state, isShow2) {
        
        state.isShow2 = isShow2
        localStorage.setItem('isShow2',isShow2)
    },
    setisShow3 (state, isShow3) {
        state.isShow3 = isShow3
        localStorage.setItem('isShow3',isShow3)
    },
    setisShow4 (state, isShow4) {
        state.isShow4 = isShow4
        localStorage.setItem('isShow4',isShow4)
    },
}

export default new Vuex.Store({
    state,
    mutations
})