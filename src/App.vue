<template>
    <div class="app__container">       
        <!-- navbar -->
        <Navbar/>        

        <!-- molal -->
        <Modal/>

        <!-- affichage de message -->
        <FlashMessage class="flash__message"/>

        <!-- loader de chargement -->
        <Loader/>

        <!-- banniere info cookies -->
        <CookieInfo/>
    </div>   
</template>
<script>
import Navbar from './components/navbar/Navbar.vue';
import FlashMessage from './components/FlashMessage.vue';
import Modal from './components/modal/Modal.vue';
import Loader from './components/loader/Loader.vue';
import CookieInfo from './components/cookieBanner/CookieInformation.vue';
export default {
    components: {
        Navbar,
        Modal,
        FlashMessage,
        Loader,
        CookieInfo
    },
    methods: {
        /**
         * affichage de la banniere des cookie
         */
        displayCookieBanner(){
            setTimeout(()=>{
                this.$store.commit('setCookieBanner', true);
            }, 5000);
        }
    },
    created(){
        /**affichage de la banniere des cookies */
        this.displayCookieBanner();
    }

};
</script>
<style>
    #app {    
        /* font-family: Avenir, Helvetica, Arial, sans-serif; */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
       
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .app__container{
        position: relative;
    }

    .flash__message{
        position: fixed;
        top: 80px;
        left: 0px;
        right: 0px;
        z-index: 10 ;
    }
</style>