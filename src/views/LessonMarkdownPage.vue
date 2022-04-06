<template>
    <div class="container">
        <div class="main__container">
            <div class="lesson__text-container-title">                
                <h3 class="lesson__text-title">
                    votre lesson en <span class="title--black">markdown</span>
                </h3>
            </div>
            <div class="lesson__container">              
                <section class="lesson__section-write">                  
                    <!-- markdown Editeur -->
                    <MarkdownEditor ref="markdowneditor"/>
                </section>
                <section class="lesson__section-markdown">
                    <MarkdownReader/>
                </section>
            </div>
            <div class="lesson__button-container">
                <SubmitButton @click="saveLesson" :disableLoginButton='disableLoginButton' :textSubmitButton='textSubmitButton'/>
                <!-- <input @click="submitForm" :disabled="!! submitFormValue" type="submit" class="button button--primary" value="Enregistrer"> -->
                <!-- <router-link @click="submitForm" class="lesson__button-navlink" to="/">Enregistrer ma lesson</router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
import MarkdownEditor from '../components/markdown/MarkdownEditor.vue';
import MarkdownReader from '../components/markdown/MarkdownReader.vue';
import SubmitButton from '../components/button/SubmitButton.vue';
export default {
    components: {
        MarkdownEditor,
        MarkdownReader,
        SubmitButton
    },
    data(){
        return {
            textSubmitButton: 'enregistrer',

            //Desactive le bouton de soumission durant le traitement de la requete
            disableLoginButton: false
        };
    },
    methods: {
        /**
         * récuperation d'un token pour le formulaire
         */
        async getTokenForm(){
            const getToken = await this.$store.dispatch('actionHandler', {action: 'getTokenForm'});

            /** enregistre le token */
            this.$store.commit('setTokenLesson', getToken.token);
        },

        /**
         * Action de création ou Update d'une lecon
         */
        async saveLesson(){
            //desactivation du boutton de soumission
            this.disableLoginButton = !this.disableLoginButton;

            /** Inscription des tags dans hidden input du Formulaire */
            const tags = await this.$refs.markdowneditor.$refs.markdownTag.setTagId();

            /** Formulaire de la leçon */
            const formLesson = this.$refs.markdowneditor.$refs.submitForm;

            /** userId  */
            const userId = this.$store.getters.getUserIdent.id;
            
            /** recuperation formdata */
            const formData = new FormData(formLesson);

            /**ajout de id utilisateur  */
            formData.append('userId', userId);

            /** ajout du token */
            formData.append('formToken', this.$store.getters.getLessonEditor.token);           

            /** requete  */
            let saveLesson;
            
            if(!this.$store.getters.getLessonEditor.id){
                /** 
                 * création d'un lecon
                 */
                saveLesson = await this.$store.dispatch('actionHandler', {action: 'createLesson', formData: Object.fromEntries(formData.entries()) });
            } else { 
                /**
                 * mise a jour d'une lecon 
                 */               
                saveLesson = await this.$store.dispatch('actionHandler', {action: 'updateLessonById', formData: Object.fromEntries(formData.entries()) });
            }
            //reactivation du boutton
            this.disableLoginButton = !this.disableLoginButton; 
        },

        /**
         * configuration des paramatres de sortie
         * si la lecon n'est pas sauvargardée
         */
        async confirmationRequestParameter(routerPathName){                
            /** mise a jour des tags de la lecon */
            const tags = await this.$refs.markdowneditor.$refs.markdownTag.setTagId();

            /** recuperation donnée de la lecon */
            const formLesson = this.$refs.markdowneditor.$refs.submitForm;

            /** userId */
            const userId = this.$store.getters.getUserIdent.id;
            
            /** recuperation formdata */
            const formData = new FormData(formLesson);

            /**ajout de id utilisateur  */
            formData.append('userId', userId);

            /** ajout du token */
            formData.append('formToken', this.$store.getters.getLessonEditor.token);

            /**données permettant d'effectuer l'action  */
            const data = {
                /** formulaire de la lecon si enregistrement */
                ValidationData: Object.fromEntries(formData.entries()), 
                /** vide le state lecon si pas d'enregistrement */
                cancelationData: true,
                /** action a executer si clic sur OUI */
                validateActionName: this.$store.getters.getLessonEditor.id ? 'updateLessonById' : 'createLesson',  
                /**  action a executer si clic sur NON */
                cancelActionName: 'lessonUpdateStatus',
                /** chemin de redirection */
                routerTo: routerPathName
            };
            
            /**Modificatgion du text de la modale */
            this.$store.commit('setConfirmationData', {
                confirmationRequestText: 'Voulez-vous enregistrer la leçon',
                validateButtonText: 'enregistrer',
                cancelButtonText: 'ne pas enregistrer',
                confirmationData: data                
            });       

            /**Affichage de la modale */
            this.$store.commit('setModalVisibilityState', true);   
        }
    },
    async created(){
        /** 
         * generation d'un token pour soumisson du formulaire
         */
        await this.getTokenForm();
    },

    async beforeRouteLeave(to, from, next) {        
        try {            
            /**si la leçon pas enregistrée */
            if(!this.$store.getters.getLessonEditor.isSave){
                /** chemin prevu de sortie demandé */
                await this.confirmationRequestParameter(to.name);
                /** message d'avertissement */
                this.$store.commit('setFlashMessageMut', { error: true, message: 'Attention, la leçon n\'est pas sauvgardée'});  
                 
                return next(false);
            }

            /**masque de la modale */
            this.$store.commit('setModalVisibilityState', false);

            //reset du strore lesson
            this.$store.dispatch('resetLessonStoreParameter');
            next();            
        } catch (error) {
            console.log(error);
        }        
    }
};
</script>

<style scoped>

.container{
    margin-top: var(--navbar_height); 
    height: calc(100vh - var(--navbar_height));
}

.main__container{
    width: 100%;
    height: 100%;
}

.lesson__container{
    display: flex;
    flex-direction: column;
    /* height: 100%; */
}

.lesson__text-title{
    padding: 30px;
    font-size: var(--form_title_size);
    text-transform: uppercase;
}

/*#region markdowEditor */
.lesson__container{
    display: flex;
    flex-direction: column;
    /* height: 100%; */
}

.lesson__section-write{
    /* min-height: 50%; */
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
}

.lesson__tag-selection{
    background: green;
    
}
/*#endregion markdowEditor */

/*#region markdown display */
.lesson__section-markdown{
    overflow-y: auto; 
    width: 100%;    
    /* height: 100%;      */
    background: rgb(238, 236, 236);
}
/*#endregion markdown display */

.lesson__button-container{
    display: flex;
    align-items: center;
    justify-content: center;   
    width: 100%;
    padding: 0px 20px;
    max-width: 768px;
    margin: 25px auto;
}

.lesson__button-navlink{
    width: 100%;
    border:.5px solid var(--main_color); 
    text-decoration: none;
    border-radius: 10px;
    color: white;
    text-transform: uppercase;
    background: transparent;
    margin: 20px 20px;
    padding: 20px 0px;
    font-weight: 800;
    background: var(--main_color); 
    max-width: 768px;
}

@media screen and (min-width:1024px) {       
    .lesson__container{        
        flex-direction: row;
    }

    .lesson__section-write{
        min-width: 50%
    }
}
</style>
