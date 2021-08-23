import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            cpf: null
        }
    },

    mutations: {
        setUser(state, user){
            const {cpf} = user;
            state.user.cpf = cpf;
        }
    }
})