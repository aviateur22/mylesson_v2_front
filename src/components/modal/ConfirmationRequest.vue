<template>
    <div @click.prevent.stop="hideModal" class="modal__container">
        <div class="modal">
            <section class="modal__title-container">
                <span class="modal__title">{{modalText}}</span>
            </section>
            <section class="modal__button-container">
                <div class="modal__button">
                    <SubmitButton @click="cancelClick" :disableCancelButton='disableCancelButton' :textSubmitButton='RejectButtonText'/>
                </div>
                <div class="modal__button">
                    <SubmitButton @click="validateClick" :disableValidateButton='disableValidateButton' :textSubmitButton='ValidateButtonText'/>
                </div>
            </section>
        </div>        
    </div>
  
</template>

<script>
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'Modal',
    components: {
        SubmitButton
    },
    data() {
        return {
            disableValidateButton: false,
            disableCancelButton: false
        };
    },
    methods: {
        /**
         * action cancel
         */
        cancelClick() {
            this.$store.dispatch('actionHandler', {action: 'stopAction'});                
        },

        /**
         * action validation
         */
        validateClick() {        
            this.$store.dispatch('actionHandler', {action: 'continueAction'});            
        },

        /** */
        hideModal(){
            this.$store.commit('setModalVisibilityState', false);
        }
    },
    computed: {        
        /**text de la modal */
        modalText(){
            return this.$store.getters.getConfirmationData.confirmationRequestText;
        },

        /**text bouton valider */
        ValidateButtonText(){
            return this.$store.getters.getConfirmationData.validateButtonText;
        },

        /**text bouton annuler */
        RejectButtonText(){
            return this.$store.getters.getConfirmationData.cancelButtonText;
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

    .modal__container{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;

    }
    .modal{
        width: 100%;
        background: white;
        padding: 15px;
    }

    .modal__title{
        text-transform: uppercase;
        padding: 20px 0px;
        font-weight: 800;
    }

    @media screen and (min-width:768px) {
        .modal{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        
    }

</style>