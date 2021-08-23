import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './views/Login';
import Formatacao from './views/Formatacao';
import RecuperarSenha from './views/RecuperarSenha';
import AlterarSenha from './views/AlterarSenha';

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    scrollBehavior(){
        return window.scrollTo({top: 0, behavior: 'smooth'});
    },
    routes:[
        {
            name: 'Login',
            path: '/',
            component: Login
        },

        {
            name: 'RecuperarSenha',
            path: '/recuperar-senha',
            component: RecuperarSenha
        },

        {
            name: 'AlterarSenha',
            path: '/alterar-senha/:email/:token',
            component: AlterarSenha,
            props: true
        },

        {
            name: 'Formatacao',
            path: '/formatacao',
            component: Formatacao,
            meta:{
                requiresAuth: true
            }
        },
    ]
})