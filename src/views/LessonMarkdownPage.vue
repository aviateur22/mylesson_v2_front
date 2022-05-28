<template>
    <div class="markdown__main-container">
        <div class="markdown__container">
            <div class="markdown__title-container">
                <h3 class="markdown__title">
                    écriver votre leçon                    
                </h3>
                <div v-if="displayMarkdwonOptionButton" @click="toogleMarkdwonOptionButton" class="markdown__option-button">
                    <MarkdownOptionButton/>
                </div>                
            </div>
            <div class="markdown__editor-container">
                <!-- markown editeur -->
                <div class="markdown__editor">              
                    <!-- markdown Editeur -->
                    <MarkdownEditor ref="markdowneditor"/>
                </div>
                <!-- boutton enregistrement et html -->
                <div @click.stop="toogleMarkdwonOptionButton" v-if="!displayMarkdwonOptionButton" class="markdown__button-container fix">                              
                    <div class="markdown__button">
                        <SubmitButton @click="saveLesson" :disableLoginButton='disableLoginButton' :textSubmitButton='"enregistrer"'/>
                        <SubmitButton @click="displayHtmlRender" :textSubmitButton='"voir le rendu"'/>
                    </div>                    
                </div>
            </div>            
        </div>
        <div @click="displayHtmlRender" v-if="displayHtml" class="markdown__html-container">
            <div class="markdow__html">
                <MarkdownReader/>
            </div>            
        </div>
    </div>
</template>

<script>
import MarkdownEditor from '../components/markdown/MarkdownEditor.vue';
import MarkdownReader from '../components/markdown/MarkdownReader.vue';
import SubmitButton from '../components/button/SubmitButton.vue';
import breakPointView from '../helper/vueBreakPoint';
import MarkdownOptionButton from '../components/markdown/MarkdownOptionMobile.vue';
export default {
    components: {
        MarkdownEditor,
        MarkdownReader,
        SubmitButton,
        MarkdownOptionButton
    },
    data(){
        return {
            //Desactive le bouton de soumission durant le traitement de la requete
            disableLoginButton: false,

            //afficher le rendu html
            displayHtml: false,
            
            //afficher / masquer les button d'option quand position = fixed
            displayMarkdwonOptionButton: false,

            //taille pour masquer les buttons options
            sizeHideMarkdownButton: 1270,

            //thematiques des lecons
            thematics: []
        };
    },
    methods: {
        /**
         * récuperation d'un token pour le formulaire
         */
        async getTokenForm(){
            /**génération token  */
            const token = await this.$store.dispatch('actionHandler', {action: 'createToken'});            

            if(!token?.dataToken){
                return;
            }

            /** enregistre le token */
            this.$store.commit('setTokenLesson', token.dataToken);
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
            if(!this.$store.getters.getLessonEditor.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            formData.append('token', this.$store.getters.getLessonEditor.token.token);
            formData.append('secret', this.$store.getters.getLessonEditor.token.secret); 
           
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
            formData.append('token', this.$store.getters.getLessonEditor.token.token);
            formData.append('secret', this.$store.getters.getLessonEditor.token.secret); 

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
            this.displayMarkdwonOptionButton = breakPointView.customBreakPoint(window.innerWidth, this.sizeHideMarkdownButton);
        },

        /**
         * modification de la visibilité des options markdown
         */
        toogleMarkdwonOptionButton(){
            /** action possible uniquement si window.innerWidth < sizeHideMarkdownButton */
            if(window.innerWidth <= this.sizeHideMarkdownButton){
                this.displayMarkdwonOptionButton = !this.displayMarkdwonOptionButton;
            }            
        },

        /**
         * récuperation des thematiques des lecons
         */
        async getAllthematics(){
            const thematics = await this.$store.dispatch('actionHandler', {action: 'getAllThematic'});            
        },

        displayHtmlRender(){
            this.displayHtml = !this.displayHtml;
        }

    },
    async created(){
        /** 
         * generation d'un token pour soumisson du formulaire
         */
        await this.getTokenForm();   
        
        /**
         * récupérarion des thématics
         */
        await this.getAllthematics();
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
    }

    .markdown__container{
        display: flex;
        flex-direction: column;   
        width: 100%;    
        min-height: calc(100vh - var(--navbar_height));
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

    .markdown__title-container{        
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0px 10px;
    }

    .markdown__title{   
        padding: 40px 0px; 
        font-size: var(--form_title_size);
        text-transform: uppercase;
        text-align: center;
        width: 100%;
    }

    .markdown__editor-container{
        position: relative;
        display: flex;
        width: 100%;
        flex-direction: row;
        height: 100%;        
    }

    .markdown__editor{
        display: flex;
        flex-direction: column;
        width: 100%;
        flex-grow: 2;
    }

    .markdown__converter-container{
        flex-grow: 1;
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
        width: 170px;
        padding: 10px;
        
    }

    .markdown__button{
        width: 100%;
    }

    .fix{
        position:fixed;
        top: 0px;
        bottom: 0px;
        right: 0px;
        width: 250px;
        background: rgba(0, 0, 0, 0.5);        
    }

    .markdown__html-container{
        margin-top: var(--navbar_height); 
        position: fixed;
        top:0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 5px;
        background: rgba(0, 0, 0, 0.5);
         z-index: 2;
    }

    .markdow__html{
        max-width: 1024px;
        width: 100%;
    }

    .markdown__option-button{
        position: fixed;
        right: 0px;
        padding:0px 15px;
        z-index: 2;
    }

    @media screen and (min-width:768px) {   
        .markdown__main-container{
            justify-content: center;
        }    
         
        .markdown__container{
            width: 768px; 
            align-items: center;               
        }
    }

    @media screen and (min-width:1024px) {         
        .markdown__container{
            width: 1024px; 
        }
}
</style>
