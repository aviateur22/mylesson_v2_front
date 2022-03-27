<template>
  <div class="main__container">
        <div class="container">
            <div class="nav__title-container">
                <h2 class="nav__title">Quel type de contenu</h2>
            </div>
          
          <section class="lesson__selection-section">
                <div class="lesson__button-container">
                    <SubmitButton @click="createLessonClick" :disableLoginButton='disableLoginButton' :textSubmitButton='textSubmitButton'/>
                </div>              
                <div class="lesson__button-container">
                    <router-link class="button button--primary" :to="utils.apiDataUrl.uploadFilePage">enregistrer une leçon</router-link>
                </div>
          </section>
      </div>
  </div>
</template>

<script>
import utils from '../helper/utils';
import SubmitButton from '../components/button/SubmitButton.vue';

export default {
    components: {
        SubmitButton
    },
    data() {
        return {
            utils: utils,
            disableLoginButton: false,
            textSubmitButton: 'Créer une leçon en Markdown'
        };
    },
    methods: {
        /**
         * création d'une nouvelle lecon en base de données
         */
        async createLessonClick(){
            //désactivation du boutton
            this.disableLoginButton = true;

            /** reste du store lesson */
            this.$store.dispatch('actionHandler', {action: 'resetLessonStoreParameter'});

            /** redirection sur la page création lecon */
            this.$router.push({name: utils.apiDataUrl.addMarkdownLessonPage.pathName});  

            //désactivation du boutton
            this.disableLoginButton = false;
        }
    }

};
</script>

<style scoped>
    .main__container{
        margin-top: var(--navbar_height);   
        height: calc(100vh - var(--navbar_height));
        z-index: -1;
        background: transparent;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
    }

    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0px 20px;
        width: 100%;
    }

    .nav__title{
        text-transform: uppercase;
        font-weight: 700;
        font-size:1.2rem ;
        padding:40px 0px
    }

    .lesson__selection-section{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex-grow: 2;           
    }

    .lesson__button-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media screen and (min-width:768px) {
         .container{                      
            max-width: 768px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;            
        }
    }
</style>