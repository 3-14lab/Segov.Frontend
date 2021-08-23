<template>
    <div id="LoginTitleBox">
        <div id="LoginImagemTitleBox">
            <img src="../assets/logo-200.png" alt="">
        </div>

        <div id="LoginTitleTextBox">
            <p class="LoginTitleText">{{texto}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        texto:{
            type:String,
            default: "INFRASIG DE INFORMAÇÃO E GESTÃO DE CUSTOS APLICADOS AO SETOR PÚBLICO"
        }
    }
}
</script>

<style>
    #LoginTitleBox{
        width: 400px;

        text-align: center;
    }

    #LoginImagemTitleBox{
        border-bottom: 1px solid rgb(170, 170, 170);
    }

    #LoginTitleTextBox{
        width: 100%;
        margin: auto;
        margin-top: 20px;

        text-align: center;
        font-size: 14pt;

        color: rgb(97, 97, 97);
    }
</style>