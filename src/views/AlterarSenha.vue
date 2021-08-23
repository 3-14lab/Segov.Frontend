<template>
    <div id="RecuperarSenha">
        <!-- <TitleLogin /> -->

        <div id="LoginFormBox">
            <div class="LoginFormTitleBox">
                <p class="LoginFormTitleText">ALTERAR SENHA</p>
                
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

                        <div>
                            <input type="password" id="Senha" v-model="senha" placeholder="Nova Senha..." />
                            <input type="password" id="NovaSenha" v-model="confirmar_senha" placeholder="Confirmar Senha..." />
                            <input type="submit" id="LoginAcessar" value="Alterar Senha" v-if="!loading" />

                            <Loading v-else/>
                        </div>
                    </form>                      
                </div>
            </div>                
        </div>

        <div id="LoginFooterBox">
            <!-- <p class="LoginFooterText">2021 &copy; INOVAÇÃO TECNOLÓGICA E MODELO CONCEITUAL</p>
            <img src="../assets/logo-unb.png" alt=""> -->
        </div>
    </div>
</template>

<script>

// import {TheMask} from 'vue-the-mask';
import {alterarSenha} from '../API/api';
// 
// import TitleLogin from '../components/TitleLogin';
import Loading from '../components/Loading';

export default {
    components: {
        // TheMask,
        // TitleLogin,
        Loading
    },

    props:{
        email: {},
        token: {},
    },

    data: function(){
        return({
            senha: "",
            confirmar_senha: "",

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
                this.senha == "" ||
                this.confirmar_senha == ""              
            ){
                this.errorRecuperar = true;
                this.messagesErrorRecuperar.push("Preencha todos os campos.");
            }

            if(this.senha != this.confirmar_senha){
                this.errorRecuperar = true;
                this.messagesErrorRecuperar.push("As senhas não coincidem.");
            }

            if(this.errorRecuperar)
                return;

            this.loading = true;

            const status = await alterarSenha(            
                this.email,
                this.token,
                this.senha
            );

            this.loading = false;

            if(status == 200){
                alert("Senha alterada com sucesso!");
            }
            else if(status == 404){
                this.errorRecuperar = true;
                this.messagesErrorRecuperar.push("Usuário ou Token inválido.");
            }
            else if(status == 400){
                this.errorRecuperar = true;
                this.messagesErrorRecuperar.push("Token expirado.");
            }
            else if(status == 500){
                this.errorRecuperar = true;
                this.messagesErrorRecuperar.push("Falha interna no servidor. Tente novamente mais tarde.");
            }
        },
    },
    created: function(){
        document.title = "Alterar Senha"
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