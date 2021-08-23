<template>
    <div id="Login">
        <!-- <TitleLogin /> -->

        <!-- Corpo do Formulário de Login -->
        <section id="LoginFormBox" v-if="!inCadastro">
            <div class="LoginFormTitleBox">
                <p class="LoginFormTitleText">ÁREA RESTRITA</p>
                
                <router-link :to="{name: 'RecuperarSenha'}">
                    <div class="LoginFormEsqueceuBox">
                        <p class="LoginFormEsqueceu">!</p>
                        <span class="tooltiptext">Esqueceu a senha?</span>
                    </div>
                </router-link>
            </div>

            <div class="LoginFormBodyBox">
                <div class="LoginFormColunaBox">
                    <p class="LoginFormText">Formatação de Arquivos</p>
                </div>

                <div class="LoginFormColunaBox">
                    <form class="LoginFormulario"
                        v-on:submit.prevent="checkFormLogin"                                                      
                    >
                        <div class="FormatacaoBox FormatacaoErrorBox" v-if="errorLogin">
                            <label for=""
                                v-for="(item, index) in messagesErrorLogin"
                                :key="index"
                            >{{item}}</label>
                        </div>

                        <the-mask type="text" :mask="['###.###.###-##']" id="LoginCPF" maxlength="14" v-model="cpf" placeholder="CPF.." />
                        <input type="password" id="LoginSenha" v-model="senha" placeholder="Senha..." />
                        <input type="submit" id="LoginAcessar" value="Acessar" />
                    </form>                      
                </div>
            </div>                
        </section>

        <!-- Corpo do Formulário de Cadastro -->
        <section id="CadastroFormBox" v-else>
            <div class="LoginFormTitleBox">
                <p class="LoginFormTitleText">CADASTRO</p>
                <p class="LoginFormTPossuiCadastro TextUnderline" v-on:click="abrirCadastro(false)">Já possui um cadastro? Entre aqui</p>
            </div>

            <div class="LoginFormBodyBox">
                <div class="LoginFormColunaBox">
                    <form class="LoginFormulario"
                        v-on:submit.prevent="checkFormCadastro"                                                      
                    >
                        <div class="FormatacaoBox FormatacaoErrorBox" v-if="errorCadastro">
                            <label for=""
                                v-for="(item, index) in messagesErrorCadastro"
                                :key="index"
                            >{{item}}</label>
                        </div>
                        <input type="text" id="CadastroNome" v-model="nome" placeholder="Nome completo" />
                        <input type="email" id="CadastroEmail" v-model="email" placeholder="Email" />
                        <the-mask type="tel" :mask="['(##) #####-####']" id="CadastroTelefone" v-model="telefone" placeholder="DDD + Celular ( Whatsapp )" />
                        <input type="text" id="CadastroEmpresa" v-model="empresa" placeholder="Nome da empresa ou organização" />
                        <!-- <div class="LoginFormBox">
                            <label for="">CPF</label> -->
                            <the-mask type="text" :mask="['###.###.###-##']" minlength="14" id="CadastroCPF" v-model="cadastro_cpf" placeholder="CPF" />
                        <!-- </div> -->
                        <input type="password" id="CadastroSenha" v-model="cadastro_senha" placeholder="Senha" />
                        <input type="password" id="CadasntroConfirmar" v-model="cadastro_confirmar" placeholder="Confirme a Senha" />
                        <div class="LoginFormLineBox">
                            <input type="checkbox" name="" id="veracidade" v-model="veracidade">
                            <label for="veracidade">Confirmo a veracidade e responsabilidade dos dados prestados neste formulário.</label>
                        </div>
                        <input type="submit" id="LoginAcessar" value="Cadastrar" />
                    </form>                      
                </div>
            </div>   
        </section>

        <div id="LoginFooterBox">
            <p class="LoginFooterText TextUnderline" v-if="!inCadastro" v-on:click="abrirCadastro(true)"><b>Não possui conta? Cadastre-se aqui</b></p>
            <p class="LoginFooterText TextUnderline" v-else v-on:click="abrirCadastro(false)"><b>Já possui um cadastro? Entre aqui</b></p>
            <footer>
                <!-- <p class="LoginFooterText">2021 &copy; INOVAÇÃO TECNOLÓGICA E MODELO CONCEITUAL</p> -->
                <!-- <img src="../assets/logo-unb.png" alt=""> -->
            </footer>
        </div>
    </div>
</template>

<script>

import {TheMask} from 'vue-the-mask';
import {inserirUsuario, Login} from '../API/api';

// import TitleLogin from '../components/TitleLogin';

export default {
    components: {
        TheMask,
        // TitleLogin
    },



    data: function(){
        return({
            cpf: "",
            senha: "",

            nome : "",
            email : "",
            telefone : "",
            empresa : "",
            cadastro_cpf : "",
            cadastro_senha : "",
            cadastro_confirmar : "",

            veracidade: false,

            inCadastro: false,

            // Erros
            errorCadastro: false,
            messagesErrorCadastro:[],

            errorLogin: false,
            messagesErrorLogin: [],
        })
    },
    methods: {
        checkFormCadastro: async function(){
            this.errorCadastro = false;
            this.messagesErrorCadastro = [];

            if(
                this.nome == "" ||
                this.email == "" ||
                this.telefone == "" ||
                this.empresa == "" ||
                this.cadastro_cpf == "" ||
                this.cadastro_senha == "" ||
                this.cadastro_confirmar == ""
            ){
                this.errorCadastro = true;
                this.messagesErrorCadastro.push("Preencha todos os campos.");
            }

            if(this.cadastro_senha != this.cadastro_confirmar){
                this.errorCadastro = true;
                this.messagesErrorCadastro.push("As senhas não coincidem.");
            }

            if(this.cadastro_senha.length < 6){
                this.errorCadastro = true;
                this.messagesErrorCadastro.push("A senha deve ter pelo menos 6 caracteres");
            }

            if(!this.veracidade){
                this.errorCadastro = true;
                this.messagesErrorCadastro.push("Você precisa confirmar que os dados prestados são verdadeiros e de sua responsabilidade.");
            }

            if(this.cadastro_cpf.length != 11){
                this.errorCadastro = true;
                this.messagesErrorCadastro.push("Informe um CPF válido");
            }


            if(this.errorCadastro)
                return;

            const status = await inserirUsuario(
                this.nome,
                this.email,
                this.telefone,
                this.empresa,
                this.cadastro_cpf,
                this.cadastro_senha,
            );

            if(status == 200){
                alert("Cadastrado com Sucesso");
                this.inCadastro = false;
            }
            else if(status == 409){                
                this.errorCadastro = true;
                this.messagesErrorCadastro.push("Esse CPF já está cadastrado.");
            }
            else{
                this.errorCadastro = true;
                this.messagesErrorCadastro.push("Erro interno no servidor. Favor, tente novamente mais tarde.");
            }
        },

        checkFormLogin: async function(){
            this.messagesErrorLogin = [];
            this.errorLogin = false;

            if(this.cpf.length != 11){
                this.errorLogin = true;
                this.messagesErrorLogin.push("Informe um CPF válido");
            }

            if(this.senha == ""){
                this.errorLogin = true;
                this.messagesErrorLogin.push("Informe uma Senha");
            }

            if(this.errorLogin)
                return;

            const status = await Login(this.cpf, this.senha);

            if(status == 200){
                this.$router.push({name:'Formatacao'});
            }
            else if(status == 401){           
                this.errorLogin = true;
                this.messagesErrorLogin.push("Usuário ou senha incorreto.");
            }
            else{
                this.errorLogin = true;
                this.messagesErrorLogin.push("Erro interno no servidor. Favor, tente novamente mais tarde.");
            }
        },

        abrirCadastro: function(value){
            this.inCadastro = value;
        },
    },
    created: function(){
        document.title = "Área Restrita";
    }
}
</script>

<style>
    #Login{
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

    #CadastroFormBox, #LoginFormBox{
        margin-top: 50px;
        background-color: white;
        /* padding: 0 20px; */
        padding-bottom: 20px;
        border: 1px solid rgb(196, 196, 196);

        width: 45%;
    }

    .LoginFormTitleBox{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px;
        height: 40px;

        background-color: #f8f8f8;
        border-bottom: 2px solid rgba(182, 182, 182, 0.473);
    }

    .LoginFormTitleText{
        font-size: 11pt;
    }

    .LoginFormEsqueceuBox{
        position: relative;
        display: inline-block;

        width: 30px;
        height: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-radius: 3px;
    }

    .tooltiptext {
        font-size: 10pt;

        visibility: hidden;
        width: max-content;
        max-width: 250px;
        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 5px 10px;
        /* border-radius: 6px; */

        /* Position the tooltip text */
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        /* margin-left: -60px; */

        /* Fade in tooltip */
        opacity: 0;
        transition: opacity 0.3s;
    }

        /* Tooltip arrow */
    .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    .LoginFormEsqueceuBox:hover{
        background-color: #40588b;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .LoginFormEsqueceuBox:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }

    .LoginFormEsqueceuBox:hover .LoginFormEsqueceu{
        background-color: rgb(252, 252, 252);
        color: black;
    }

    .LoginFormEsqueceu{
        background-color: rgb(180, 180, 180);
        width: 15px;
        height: 15px;
        text-align: center;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50%;
        color: white;

        font-size: 10pt;
        font-weight: bolder;
    }

    .LoginFormTPossuiCadastro{
        font-size: 10pt;
        color: gray;
    }

    .LoginFormBodyBox{
        margin-top: 20px;

        display: flex;
        flex-direction: row;

    }

    .LoginFormColunaBox:first-child{
        border-right: 1px solid rgb(189, 189, 189);
    }

    .LoginFormColunaBox{
        flex: 1;
        padding: 0 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .LoginFormulario{
        width: 100%;
    }

    .LoginFormulario input:not([type="submit"], [type="checkbox"]){
        width: 100%;
        margin-bottom: 10px;

        padding: 10px;
        font-size: 10pt;
        border: 1px solid rgb(212, 212, 212);
        border-radius: 3px;
        outline: none;
    }

    .LoginFormulario input:not([type="submit"]):focus{
        border: 1px solid rgb(85, 144, 211);
        
    }

    .LoginFormLineBox{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
    }

    .LoginFormLineBox label{
        margin-left: 10px;
        font-size: 10pt;
    }

    #LoginAcessar{
        float: right;

        padding: 8px 10px;
        background-color: #627aad;
        color: white;
        border: none;
        border-radius: 3px;

        font-size: 10pt;

        margin-top: 20px;
    }

    #LoginAcessar:hover{
        background-color: #495b81;
    }

    #LoginFooterBox{
        text-align: center;

        margin-top: 20px;
    }

    .LoginFooterText{
        font-size: 10pt;
        margin-bottom: 10px;

        color: gray;
    }

    .TextUnderline{
        cursor: pointer;
    }

    .TextUnderline:hover{
        text-decoration: underline;
    }

    @media screen and (max-width: 800px){
        #CadastroFormBox, #LoginFormBox{
            margin-top: 0px;
            width: 90%;
            /* background: black; */
        }

        .LoginFormTitleText{
            font-size: 11pt;
        }

        .LoginFormTPossuiCadastro{
            font-size: 9pt;
        }

        .LoginFormBodyBox{
            display: flex;
            flex-direction: column;
        }

        .LoginFormColunaBox:first-child{
            margin-bottom: 20px;
            border: none;
        }

        .LoginFormLineBox label{
            margin-left: 10px;
            font-size: 9pt;
            color: gray;
        }
    }
</style>