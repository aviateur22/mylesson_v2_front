<template>
<div v-if="modalVisibility" class="modal__main-container">    
    <ConfirmationRequest v-if="!this.$store.getters.getTextDisplayState"/>        
    <TextModalComponent v-else/>    
</div>
  
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