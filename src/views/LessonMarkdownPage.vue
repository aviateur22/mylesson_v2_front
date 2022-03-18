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
                <SubmitButton @click="registerLessonClick" :disableLoginButton='disableLoginButton' :textSubmitButton='textSubmitButton'/>
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
         * 
         */
        async registerLesson(){
            //Inscription des tags dans hidden input du Formulaire            
            const tags = await this.$refs.markdowneditor.$refs.markdownTag.setTagId();

            /** Formulaire de la leçon */
            const formLesson = this.$refs.markdowneditor.$refs.submitForm;    
            
            /** Enregistrement du formaulaire */
            const registerLesson = await this.$store.dispatch('actionHandler', {action: 'lessonRegisterAction', formElement: formLesson });

            /** renvoie du statut de sauvegarde */
            return registerLesson;
        },

        /**
         * Context pour la modal
         */
        async modalParameter(routerPathName){ 
            /**Modificatgion du text de la modale */
            this.$store.commit('setModalTextStateMut', 'enregistrer votre leçon?');
            this.$store.commit('setModalValidateButtonTextStateMut', 'enregister');
            this.$store.commit('setmodalRejectButtonTextStateMut', 'ne pas enregistrer')  
            /**Affichage de la modale */
            this.$store.commit('setModalVisibilityStateMut', true);      
            /** Formulaire de la leçon */
            const tags = await this.$refs.markdowneditor.$refs.markdownTag.setTagId();
            const formLesson = this.$refs.markdowneditor.$refs.submitForm;

            const data = {
                data: formLesson, 
                validateActionName: 'lessonRegisterAction',  
                cancelActionName: 'leaveEditor',
                routerTo: routerPathName
            }

            this.$store.commit('setDataMut', data);           
        },

        /**
         * clique enregistrement leçon
         */
        async registerLessonClick() {    
            //desactivation du boutton de soumission
            this.disableLoginButton = !this.disableLoginButton;
            const registerLesson = await this.registerLesson();
            //reactivation du boutton
            this.disableLoginButton = !this.disableLoginButton;                  
        }
    },
    async beforeRouteLeave(to, from, next) {        
        try {            
            /**leçon pas enregistré */
            if(!this.$store.getters.lessonSaveStateGet){
                /** parametrage de la modal */
                await this.modalParameter(to.name)
                /**message d'avertissement */
                this.$store.commit('setFlashMessageMut', { error: true, message: 'Attention, la leçon n\'est pas sauvgardée'});  
                 
                return next(false);
            }
            //reset state lecon
            this.$store.dispatch('resetLessonAction');
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
    /* overflow-y: auto; */
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
