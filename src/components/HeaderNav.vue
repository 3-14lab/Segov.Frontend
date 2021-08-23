<template>
    <nav id="HeaderNav">
        <!-- <img id="HeaderNaveImage" src="../assets/logo-branca.png" alt=""> -->
        <h1 id="HeaderNavTitle">SICGESP</h1>

        <div id="NavOpcoesBox">            
            <div class="NavOpcoes"
                @click="deslogar"
            >
                <i class="fas fa-sign-out-alt"></i>
                <span class="tooltiptextBottom">Sair</span>
            </div>
        </div>
    </nav>
</template>

<script>

import {Logout} from '../API/api';

export default {
    methods:{
        deslogar: async function(){
            await Logout();

            this.$router.push({name: 'Login'});
        }
    }
}
</script>

<style>
    #HeaderNav{
        background: #383838;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 10px 50px;
    }

    #HeaderNaveImage{
        max-width: 100px;
    }

    #HeaderNavTitle{
        color: rgb(206, 206, 206);
        font-size: 12pt;
    }

    #NavOpcoesBox i{
        color: rgb(206, 206, 206);
    }

    #NavOpcoesBox i:not(:first-child){
        margin-left: 20px;
    }

    #NavOpcoesBox i:hover{
        /* color: #6b8eda; */
    }

    .NavOpcoes{
        position: relative;

        width: 30px;
        height: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-radius: 3px;
    }

    .tooltiptextBottom {
        font-size: 10pt;

        visibility: hidden;
        width: max-content;
        height: max-content;

        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 5px 10px;
        /* border-radius: 6px; */

        /* Position the tooltip text */
        position: absolute;
        z-index: 1;
        top: 130%;
        left: 50%;
        transform: translateX(-50%);
        /* margin-left: -60px; */

        /* Fade in tooltip */
        opacity: 0;
        transition: opacity 0.3s;
    }

        /* Tooltip arrow */
    .tooltiptextBottom::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #555 transparent;
    }

    .NavOpcoes:hover{
        background-color: #525252;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .NavOpcoes:hover .tooltiptextBottom {
        visibility: visible;
        opacity: 1;
    }
</style>