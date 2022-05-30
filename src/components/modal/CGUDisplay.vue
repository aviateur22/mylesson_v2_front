<template>
    <!-- modal qui contientd e la donnée -->
    <div class="text__modal-container">
        <div class="text__modal-inner">
                <div class="text__modal-title">
                <h2 class="">{{ cgu.title }}</h2>
            </div>
            <div class="text__modal">
                <CguComponent v-for="(article, i) in cgu.articles" :data="article" :key="i"/>
            </div>
            <SubmitButton @click.prevent="closeCgu" :textSubmitButton="'je valide les CGU'"/>
        </div>        
    </div>
  
</template>

<script>
import CguComponent from '../footer/FooterArticle.vue';
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'textDisplayModal',
    components: {
        CguComponent,
        SubmitButton
    },
    data(){
        return {
            //CGU: this.$store.getters.getCgu
        };
    },
    methods: {
        /**
         * fermture affichage de CGU
         */
        closeCgu(){
            /** supprime l'affiche de CGU */
            this.$store.commit('setTextDisplay', false);

            /** masque la modal */
            this.$store.commit('setModalVisibilityState', false);
        }
    },
    computed: {
        /** récuperation des CGU */
        cgu(){
            return this.$store.getters.getCgu;
        }
    } 

};
</script>

<style scoped>
    .text__modal-container{        
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        padding-top: 10%;
    }

    .text__modal-inner{
        background: white;
        padding: 30px;
        width: 100%;
    }
    .text__modal-title{
        width: 100%;
        padding: 20px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .text__modal{
        padding: 20px;
        width: 100%;
    }

    @media screen and (min-width:768px) {

        .text__modal-inner{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

    @media screen and (min-width:1024px) { 

    }

</style>