<template>
  <div @click="displayLessonClick" class="lesson__button-container">     
    <div class="lesson__button">            
      <div class="button__inner">
          <div class="button__title">
              <TitleButtonComponent :data="this.data"/>
          </div>        
        <!-- thematic de la lecon -->
        <div class="button__thematic-image">
            <ThematicImageComponent :data="this.data"/>
        </div>
        
        <!-- bouton supprimer lecon -->
        <RoundedButton v-if="deleteLessonButton" @click.stop="deleteLesson"/>
      </div>
    </div>
  </div>
</template>

<script>

import RoundedButton from '../RoundedButton.vue';
import TitleButtonComponent from './TitleButton.vue';
import ThematicImageComponent from './ThematicImage.vue';
export default {    
    name: 'LessonButton',
    components: {
        RoundedButton,
        TitleButtonComponent,
        ThematicImageComponent
    },
    /**
     * editLesson: true => ouverture lecon en ecriture
     * editLesson: false => ouverture lecon en lecture
     */
    props: ['data', 'editLesson', 'deleteLessonButton'],
    data(){
        return {
                    
        };
    },
    methods: {
        /**
         * action du clic sur un bouton
         * @param {string} actionClickName - nom de l'action a executer au clic
         */
        displayLessonClick(){                   
            /** recuperation de la lesson par son slug */
            if(!this.editLesson){ 
                return this.$router.push({name: 'ReadLesson', params: {slug: this.data.slug}});
            }  
            
            /** recuperation formdata */
            const formData = new FormData();

            /** id utilisateur */
            const userId = this.$store.getters.getUserIdent.id;

            /**ajout de id utilisateur  */
            formData.append('userId', userId);

            /** recuperation lecon pason id */ 
            this.$store.dispatch('actionHandler', {action: 'getLessonById', formData: Object.fromEntries(formData.entries()), lessonId: this.data.id });
        },
        
        async deleteLesson(){            
            /** commit du state deleteLesson */
            this.$store.commit('setDeleteLessonId', this.data.id);

            /**géneration d'un token pour la suppression d'une lecon*/
            const token = await this.$store.dispatch('actionHandler', {action: 'createToken'});            

            if(!token?.dataToken){
                return;
            }

            /** enregistre le token */
            //this.$store.commit('setDeleteLessonToken', token.dataToken);

            /** recuperation formdata */
            const formData = new FormData();

            /** id utilisateur */
            const userId = this.$store.getters.getUserIdent.id;

            /**ajout de id utilisateur  */
            formData.append('userId', userId);

            /** ajout du token */
            //const deleteLessonToken = this.$store.getters.getDeleteLesson.token;            
            formData.append('token', token.dataToken.token);

            /**données permettant d'effectuer l'action  */
            const data = {
                /** formData contenant le id de l'utilisateur */
                ValidationData: Object.fromEntries(formData.entries()), 
                /** vide le state deleteLesson si annulation */
                cancelationData: true,
                /** action a executer si clic sur OUI */
                validateActionName: 'deleteLessonById',  
                /**  action a executer si  sur NON */
                cancelActionName: 'cancelDeleteLesson'               
            };
            
            /**Modificatgion du text de la modale */
            this.$store.commit('setConfirmationData', {
                confirmationRequestText: `voulez-vous supprimer la leçon: ${this.data.title}`,
                validateButtonText: 'oui',
                cancelButtonText: 'non',
                confirmationData: data                
            });

            /**Affichage de la modale */
            this.$store.commit('setModalVisibilityState', true);           
        }
    }
};
</script>

<style scoped>
    .button__inner{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
    }

    .button__title{    
        border-bottom: 0.1px solid rgb(161, 161, 161);
    }

    .lesson__button-container{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        border-radius: 5px;
        margin: 10px 0px;        
        cursor: pointer;      
        width:100%;        
    }

    .button__delete-lesson{
        padding: 25px;
        position: absolute;
        right: 0px;
        top: 0px
    }

    @media screen and (min-width: 768px) {        
        .button__inner{
            flex-direction: row;
            align-items: center;
        }           
        
        .button__title{
            width: 100%;
            flex-grow: 2;
            border-right: 0.1px solid rgb(161, 161, 161);
        }

        .button__thematic-image{
            width: 200px;
        }
    }

    @media screen and (min-width:1024px) {
            
    }

</style>