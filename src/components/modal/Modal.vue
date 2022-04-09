<template>
    <transition name="slide-fade">
        <div v-if="modalVisibility" class="modal__main-container">    
            <ConfirmationRequest v-if="!this.$store.getters.getTextDisplayState"/>        
            <TextModalComponent v-else/>    
        </div>
    </transition>
  
</template>

<script>
import ConfirmationRequest from './ConfirmationRequest.vue';
import TextModalComponent from './CGUDisplay.vue';
export default {
    name: 'Modal',   
    components: {
        ConfirmationRequest,
        TextModalComponent
    },
    computed: {
        /**état de visibilité de la modal */
        modalVisibility(){
            return this.$store.getters.getModalVisibilityState;
        }
    }
};
</script>

<style scoped>
    .slide-fade-enter-active {      
        opacity: 1;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {            
        opacity: 0; 
    }

    @keyframes slide-fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .modal__main-container{
        display: flex;
        position: fixed;
        top:0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 100vh;
        width: 100%;       
        background: rgba(0,0,0,0.5);
        z-index: 2;
    }
</style>