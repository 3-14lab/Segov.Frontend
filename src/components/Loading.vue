<template>
    <div class="loader"></div>
</template>

<script>
export default {

}
</script>

<style>
    /* .loader {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db; 
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;

        margin: auto;

        float: right;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    } */

    .loader {
        display: inline-block;
        width: 40px;
        height: 40px;

        float: right;
    }
    .loader:after {
        content: " ";
        display: block;
        width: 24px;
        height: 24px;
        margin: 8px;
        border-radius: 50%;
        border: 3px solid rgb(70, 70, 70);
        border-color: rgb(59, 59, 59) transparent rgb(59, 59, 59) transparent;
        animation: asd 1.2s linear infinite;
    }
    @keyframes asd {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        }
</style>