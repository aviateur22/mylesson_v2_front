<template>
   <div class="lesson__text-container">
        <div class="lesson__form-container">
            <form ref="submitForm" @submit.prevent="registerLesson" class="lesson__form">
                <!-- selection du thème de la lecon -->
                <div class="form__group-select">
                    <div class="form__group">
                        <label for="thematic" class="form__label">sélectionner votre thématique</label>
                        <select class="form__input" name="thematic" v-model="thematic">
                            <option selected disabled value="">Choisissez votre thème</option>
                            <option name="thematic">homme</option>
                            <option name="thematic">femme</option>
                        </select>
                    </div>
                </div>

                <div class="lesson__tag-container">
                    <!-- Selection des tags -->
                    <MarkdownTag :filterLesson="false" ref="markdownTag" class="lesson__tag-selection"/>                      
                </div>

                <!-- titre de la lecon -->
                <div class="form__group">                   
                    <label for="title" class="form__label">titre de votre lesson</label>
                    <div class="form__control">
                        <input ref="inputTitle" v-model="lessonName" @keyup="titleChange" class="form__input" type="text" placeholder="titre de votre lesson" name="title">
                    </div>
                </div>
                <!-- résumé de la lecon -->
                <div class="form__group">                   
                    <label for="summary" class="form__label">résumé de votre lecon</label>
                    <div class="form__control">
                        <input v-model="summary" @keyup="summaryChange" class="form__input" type="text" placeholder="mon petit résumé ..." name="summary">
                    </div>
                </div>

                <!-- lecon en markdown -->
                <div class="form__group--textaera">
                    <label for="lesson" class="form__label">votre lesson en Markdown</label>
                    <div class="form__control form--textarea">
                        <textarea @keydown="lessonChange" @keyup="lessonChange" ref="textarea" v-model="this.lessonMarkdown" name="content" id="textarea" rows="" cols="30" placeholder="Commencer votre nouvelle lesson...." class="form__input input--textarea"></textarea>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import MarkdownHandler from '../../helper/markdown/markdownConverter';
import MarkdownTag from '../TagLesson/MarkdownTag.vue';

export default {
    name: 'MardownEditor',
    components: {     
        MarkdownTag
    },
    props: ['registerAction', 'submitFormValue'],    
    data(){
        return {           
            lessonName: null,
            lessonMarkdown: null,
            markdownHandler: new MarkdownHandler()
        };
    },    
    methods: {        
        /**
         * transformation des données textarea en html
         */
        lessonChange(e){         
            // gestion TAB   
            if(e.key === 'Tab') {
                e.preventDefault();                
                const start = this.$refs.textarea.selectionStart;
                const end = this.$refs.textarea.selectionEnd;
                this.$refs.textarea.value = this.$refs.textarea.value.substring(0, start) + '\t' + this.$refs.textarea.value.substring(end);                
                this.$refs.textarea.selectionStart = this.$refs.textarea.selectionEnd = start + 1;
                return false;
            }
            //Envoie du text markdown dans le store
            this.$store.commit('setLessonMarkdownText', this.$refs.textarea.value);

            // Renvoie le text markdown formatté en html
            const lessonHtml = this.markdownHandler.getHtml(this.$store.getters.getLessonEditor.markdownText);            
            
            //Envoie du text au format HTML dans le store pour le composant MarkdownReader
            this.$store.commit('setLessonInHtml', lessonHtml);

            //passe le status  de sauvegarde à false
            this.$store.commit('setLessonSaveStatus', false);
        },

        /**
         * Modification du titre
         */
        titleChange(e){ 
            //mutation du titre
            this.$store.commit('setLessonTitle', this.$refs.inputTitle.value);
            //passe le status  de sauvegarde à false
            this.$store.commit('setLessonSaveStatus', false);
        },

        /**
         * initilalisation du formulaire pour le chargement d'une leçon 
         */
        formLessonLoad(){
            /**chargement des données si id de present*/
            if(this.$store.getters.getLessonEditor.id){     
                this.lessonName = this.$store.getters.getLessonEditor.title;
                this.lessonMarkdown = this.$store.getters.getLessonEditor.markdownText;           
                this.$refs.inputTitle.value = this.$store.getters.getLessonEditor.title;
                this.$refs.textarea.value = this.$store.getters.getLessonEditor.markdownText;
            }
        }
    },
    mounted(){
        /**
         * initilalisation formulaire pour un update 
         */
        this.formLessonLoad();
    }
};
</script>

<style scoped>

.lesson__text-container{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    height: 100%;
   
}

.lesson__text-title{
    padding: 10px;
    font-size: var(--form_title_size);
    text-transform: uppercase;
}

.lesson__form-container{    
   height: 100%;      
}

.lesson__form{
    height: 100%; 
}

.form__group{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    padding: 10px;
}

.form__label{
    text-align: left;
    width: 100%;
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 5px 0px;
    font-weight: 800;
}

.form__control{
    width: 100%;
    height: 100%;  
}

.form__input{
    width: 100%;
    height: 45px;
    border:0.5px solid var(--main_color);
    border-radius: 10px;
    padding-left: 5px;
    outline: none;
}

.form__group--textaera{   
    display: flex; 
    flex-direction: column;    
    justify-content: stretch;
    padding: 10px;
    background: red;
    min-height: 480px;
    height: 45%;
}

.form--textarea{
}

.input--textarea{       
    height: 100%;
    border:none;
    border-radius: 0px;
    border-top:0.5px solid white;      
    box-sizing: border-box;
}
</style>