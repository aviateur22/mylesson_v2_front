<template>
     <!-- modal avec les CGU -->
    <div class="input__checkbox-container">
        <!-- container CGU et checkbox -->
        <div class="input__checkbox-main">
             <!-- bouton visualisation CGU -->
            <SubmitButton class="button__cgu" @click.prevent="displayCGU" :textSubmitButton="'voir les CGU'"/> 
            <!-- checkbox et label -->
            <div class="input__label">
                <input class="input" type="checkbox" value="" id="checkbox" v-model="checked">
                <label class="label" for="checkbox"> je reconnais avoir lu et accepter les CGU</label>
            </div>
                      
        </div>        
    </div>
</template>

<script>
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'inputCheckboxCGU',
    data(){
        return {
            checked: false
        };
    },
    components: {
        SubmitButton,
    },
    methods: {
        /**
         * affichage de la modal
         */
        displayCGU(){
            /** confirme l'affichage des CGU */
            this.$store.commit('setTextDisplay', true);

            /**affichage de la modal */
            this.$store.commit('setModalVisibilityState', true);
        }
    }
};
</script>

<style scoped>
    .input__checkbox-container{
        display: flex;
        width: 100%;
        align-items: center;
        padding: 15px;
    }

    .input__checkbox-main{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        justify-content: center;
    }

    .input__label{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
    }

    .button__cgu{
        background: transparent;
        width: 100%;
        color: var(--main_color_small);
        transition: all var(--transition_standard) ease-in;
    }

    .label {
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 800;
        padding: 10px;
    }

</style>