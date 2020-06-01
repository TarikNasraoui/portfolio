import Vuex from 'vuex';
import Vue from 'vue';
import todos from './modules/todos'
import user from './modules/user'
import profile from './modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user,
        todos,
        profile
    }
})