<template>
    <div v-if="isVisible" class="loader__container">
        <!--Loader -->
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>    
</template> 

<script>
export default {
    name: 'loader',
    computed: {
        isVisible(){            
            return this.$store.getters.getLoaderStatus;
        }
    }
};
</script>

<style scoped>
    .loader__container{
        position:fixed ; 
        width: 100px;
        text-align: center;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        width: 100%;        
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(110, 110, 110,0.5);
        z-index: 3;
    }

    .spinner {        
        width: 100px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .spinner > div {
        width: 10px;
        height: 10px;
        background-color:var(--main_color);
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {  
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
        0%, 80%, 100% { -webkit-transform: scale(0) }
        40% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bouncedelay {
        0%, 80%, 100% { 
            -webkit-transform: scale(0);
            transform: scale(0);
        } 40% { 
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
}
</style>