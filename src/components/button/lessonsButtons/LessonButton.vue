<template>
  <div @click="displayLessonClick" class="lesson__button-container">     
    <div class="main__container">            
      <div class="button__container">           
        <section class="button__title-container">
            <!-- date de creation -->
            <span class="button__date">{{data.created}}</span>
            <!-- titre de la leçon -->
            <h3 class="button__title">{{ data.title }}</h3>
            <!-- tags de la lecon -->
            <section class="button__tag-container">
                <div class="button__tag">
                    <LessonTag v-for="(tag,id) in data.lessonsTags" :key="id" :data='tag'/>
                </div>                
            </section>            
        </section>
        <!-- thematic de la lecon -->
        <section class="thematic__container">            
        
        </section>        
        <!-- bouton supprimer lecon -->
        <RoundedButton v-if="deleteLessonButton" @click.stop="deleteLesson"/>
      </div>
    </div>
  </div>
</template>

<script>
import LessonTag from './LessonTag.vue';
import RoundedButton from '../RoundedButton.vue';
import MarkdownHandler from '../../../helper/markdown/markdownConverter';
export default {    
    name: 'LessonButton',
    components: {
        LessonTag,
        RoundedButton

    },
    /**
     * editLesson: true => ouverture lecon en ecriture
     * editLesson: false => ouverture lecon en lecture
     */
    props: ['data', 'editLesson', 'deleteLessonButton'],
    data(){
        return {
            markdownHandler: new MarkdownHandler(),
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
            const deleteToken = await this.$store.dispatch('actionHandler', {action: 'getTokenForm'});

            /** si pas de token  */
            if(!deleteToken){
                return;
            }

            this.$store.commit('setDeleteLessonToken', deleteToken.token);

            /** recuperation formdata */
            const formData = new FormData();

            /** id utilisateur */
            const userId = this.$store.getters.getUserIdent.id;

            /**ajout de id utilisateur  */
            formData.append('userId', userId);

            /** ajout du token */
            const deleteLessonToken = this.$store.getters.getDeleteLesson.token;
            
            formData.append('formToken', deleteLessonToken);

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
    },
    computed: {   
        lessonsHtml(){
            return this.markdownHandler.getHtml(this.data.content);
        }     
    },
};
</script>

<style scoped>
    .button__container{
        position: relative;
    }

    .lesson__button-container{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 5px;
        margin: 10px 0px;        
        cursor: pointer;      
        width:95%;        
        overflow: hidden;
        min-width: 300px
    }

    .button__title-container{
        padding: 15px 5px;
        background: rgb(107, 107, 107);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .button__date{
        font-size: var(--text_s);
        color: white;
        padding: 10px;
        text-transform: uppercase;
    }

    .button__title{
        padding: 5px;
        text-transform: uppercase;
        font-weight: 800;
        font-size: var(--text_button_size);
        color:white
    }

    .button__tag-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button__tag{
        display: flex;
    }

    .lesson__markdown-text{
        padding: 0px 5px;   

    }

    .button__content-container{
        overflow: hidden;
        width: 100%;
        text-align: left; 
    }

    .button__delete-lesson{
        background: red;
        padding: 25px;
        position: absolute;
        right: 0px;
        top: 0px

    }

    @media screen and (min-width:560px) {
        .lesson__button-container{   
            margin: 10px;     
            width:calc( 50% - 20px); 
        }
    }

    @media screen and (min-width:1024px) {
        .lesson__button-container{   
            margin: 10px;     
            width:calc( 40% - 90px); 
        }
    }

</style>