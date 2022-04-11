<template>
    <div class="markdown__main-container">
        <div class="markdown__container">
            <div class="markdown__title-container">
                <h3 class="markdown__title">
                    écriver votre leçon                    
                </h3>
            </div>
            <div class="markdown__editor-container">
                <div class="markdown__editor">              
                    <!-- markdown Editeur -->
                    <MarkdownEditor ref="markdowneditor"/>
                </div>
                <div class="markdown__button-container fix">   
                    <div class="markdown__button" v-if="mobileSize" >
                        <SubmitRoundedButton :imageSource="'../../assets/img/save.png'" @click="saveLesson"/>
                        <SubmitRoundedButton :imageSource="'../../assets/img/save.png'"/>
                    </div>                 
                    <div class="markdown__button" v-else>
                        <SubmitButton @click="saveLesson" :disableLoginButton='disableLoginButton' :textSubmitButton='"enregistrer"'/>
                        <SubmitButton :textSubmitButton='"voir"'/>
                    </div>                    
                </div>
            </div>            
        </div>
        <section v-if="displayHtml" class="markdown__converter-container">
            <MarkdownReader/>
        </section>
    </div>
</template>

<script>
import MarkdownEditor from '../components/markdown/MarkdownEditor.vue';
import MarkdownReader from '../components/markdown/MarkdownReader.vue';
import SubmitRoundedButton from '../components/button/RoundedButton.vue';
import SubmitButton from '../components/button/SubmitButton.vue';
import breakPointView from '../helper/vueBreakPoint';
export default {
    components: {
        MarkdownEditor,
        MarkdownReader,
        SubmitButton,
        SubmitRoundedButton
    },
    data(){
        return {
            //Desactive le bouton de soumission durant le traitement de la requete
            disableLoginButton: false,

            //afficher le rendu html
            displayHtml: false,

            mobileSize: false,

            wrapText: true
        };
    },
    methods: {
        /**
         * récuperation d'un token pour le formulaire
         */
        async getTokenForm(){
            /** generation d'un nouveau de token */
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

            /** mise a jour du token */
            await this.getTokenForm();

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
        },

        /**
         * taille d'affichage pour la gestion des buttons
         */
        resizeAction() {
            this.mobileSize = breakPointView.mobileBreakPoint(1024);
        },

    },
    async created(){
        /** 
         * generation d'un token pour soumisson du formulaire
         */
        await this.getTokenForm();        
    },
    mounted() {
        window.addEventListener('resize', this.resizeAction);
        this.resizeAction();
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

    .markdown__main-container{
        margin-top: var(--navbar_height); 
        min-height: calc(100vh - var(--navbar_height)); 
        display: flex;
        align-items: stretch;       
        background: red;
    }

    .markdown__container{
        display: flex;
        flex-direction: column;   
        width: 100%;    
        min-height: calc(100vh - var(--navbar_height));
    }

    .markdown__title-container{
        padding: 20px;
    }

    .markdown__title{    
        font-size: var(--form_title_size);
        text-transform: uppercase;
    }

    .markdown__editor-container{
        display: flex;
        width: 80%;
        flex-direction: row;
        position: relative;
        height: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

    .markdown__editor{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .markdown__converter-container{
        overflow-y: auto; 
        width: 100%;
        background: rgb(238, 236, 236);
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px
    }

    .markdown__button-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;   
        height: 100%;
        width: 100%;
        margin-right: 10px;
    }

    .markdown__button{
        width: 100%;
    }

    .fix{
        position:fixed;
        top: 0px;
        bottom: 0px;
        right: 0px;
        width: 150px;
        
        }
    /* 
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
    } */

    @media screen and (min-width:768px) {  
        .markdown__container{
            width: 768px;                
        }
    }

    @media screen and (min-width:1024px) { 
         .markdown__main-container{
            justify-content: center;
        }    

        .markdown__container{
            width: 1024px;
            align-items: center;
        }

        .markdown__editor-container{
            width: 100%;

        }
}
</style>
