<template>
    <div id="RecuperarSenha">
        <!-- <TitleLogin /> -->

        <div id="LoginFormBox">
            <div class="LoginFormTitleBox">
                <p class="LoginFormTitleText">RECUPERAR SENHA</p>
                
                <router-link :to="{name : 'Login'}">
                    <div class="LoginFormEsqueceuBox">
                        <p class="LoginFormVoltar"><i class="fas fa-user-alt"></i></p>
                        <span class="tooltiptext">Voltar para o Login</span>
                    </div>
                </router-link>
            </div>

            <div class="LoginFormBodyBox">             
                <div class="LoginFormColunaBox">
                    <form class="LoginFormulario"
                        v-on:submit.prevent="checkFormRecuperar"                                                      
                    >
                        <div class="FormatacaoBox FormatacaoErrorBox" v-if="errorRecuperar">
                            <label for=""
                                v-for="(item, index) in messagesErrorRecuperar"
                                :key="index"
                            >{{item}}</label>
                        </div>

                        <input type="email" id="RecuperarEmail" v-model="email" placeholder="Email..." />
                        <input type="submit" id="LoginAcessar" value="Recuperar Senha" v-if="!loading" />

                        <Loading v-else/>
                    </form>                      
                </div>
            </div>                
        </div>

        <div id="LoginFooterBox">
            <p class="LoginFooterText">Se demorar a receber o e-mail cheque o spam ou tente novamente</p>
            <!-- <img src="../assets/logo-unb.png" alt=""> -->
        </div>
    </div>
</template>

<script>

// import {TheMask} from 'vue-the-mask';
import {recuperarSenha} from '../API/api';

// import TitleLogin from '../components/TitleLogin';
import Loading from '../components/Loading';

export default {
    components: {
        // TheMask,
        // TitleLogin,
        Loading
    },

    data: function(){
        return({
            email: "",

            // Erros
            errorRecuperar: false,
            messagesErrorRecuperar:[],

            loading: false,
        })
    },
    methods: {
        checkFormRecuperar: async function(){
            this.errorRecuperar = false;
            this.messagesErrorRecuperar = [];

            if(
                this.email == ""               
            ){
                this.errorRecuperar = true;
                this.messagesErrorRecuperar.push("Preencha todos os campos.");
            }

            if(this.errorRecuperar)
                return;

            this.loading = true;
            const status = await recuperarSenha(            
                this.email,
            );

            this.loading = false;

            if(status == 200){
                alert("Email enviado");
            }
            else if(status == 404){
                this.errorRecuperar = true;
                this.messagesErrorRecuperar.push("Usuário não encontrado.");
            }
        },
    },
    created: function(){
        document.title = "Recuperar Senha"
    }
}
</script>

<style>
    #RecuperarSenha{
        background-color: #e6e6e6;
        width: 100%;
        min-height: 100vh;
        padding-bottom: 50px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: relative;
    }

    .LoginFormVoltar{
        font-size: 8pt;
        color: gray;
    }

    .LoginFormEsqueceuBox:hover .LoginFormVoltar{
        color: white;
    }
</style>