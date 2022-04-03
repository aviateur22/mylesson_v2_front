<template>
    <div class="app__container">       
        <Navbar/>        
        <Modal/>
        <FlashMessage class="flash__message"/>
        <Loader/>
    </div>   
</template>
<script>
import Navbar from './components/navbar/Navbar.vue';
import FlashMessage from './components/FlashMessage.vue';
import Modal from './components/modal/Modal.vue';
import Loader from './components/loader/Loader.vue';
export default {
    components: {
        Navbar,
        Modal,
        FlashMessage,
        Loader
    }  
};
</script>
<style>
    #app {    
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background: var(--main_background_color);  
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