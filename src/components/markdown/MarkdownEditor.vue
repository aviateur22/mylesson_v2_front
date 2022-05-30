<template>
   <div class="lesson__text-container">
        <div class="lesson__form-container">
            <form ref="submitForm" @submit.prevent="registerLesson" class="lesson__form">
                <!-- selection du thème de la lecon -->
                <div class="form__group-select">
                    <div class="form__group">
                        <label for="thematicId" class="form__label">sélectionner votre thématique</label>                       
                        <select class="form__input" name="thematicId" v-model="lessonThematic">
                            <option selected disabled>Choisissez votre thème</option>
                            <option  class="select-option" v-for="(thematic, i) in thematics" :key="i" :value="thematic.id" name="thematicId"> {{ thematic.name.toUpperCase()}}</option>                            
                        </select>
                    </div>
                </div>

                <div class="lesson__tag-container">
                    <!-- Selection des tags -->
                    <MarkdownTag :title="'Ajouter un ou plusieurs tag(s) à votre leçon'" :filterLesson="false" ref="markdownTag" class="lesson__tag-selection"/>                      
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
                        <input v-model="lessonSummary" @keyup="summaryChange" class="form__input" type="text" placeholder="mon petit résumé ..." name="summary">
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
            lessonName: undefined,
            lessonSummary: null,
            lessonThematic: 'Choisissez votre thème',
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
        
        /** récupération du contenu initilae */
        initialData(){
            //titre
            this.lessonName = this.$store.getters.getLessonEditor.title;

            //résumé
            this.lessonSummary = this.$store.getters.getLessonEditor.summary;

            //markdown
            this.lessonMarkdown = this.$store.getters.getLessonEditor.markdownText;

            //thématique
            if(this.$store.getters.getLessonEditor?.thematic?.id){
                this.lessonThematic = this.$store.getters.getLessonEditor.thematic.id;    
            }
        }

    },
    computed: {
        /**
         * thématiques de disponible
         */
        thematics(){                 
            return this.$store.getters.getThematics.thematics;
        },

        /**
         * nom de le lecon
         */
        lessonNameStore(){
            return this.$store.getters.getLessonEditor.title;
        },

        /** markdown */
        lessonMarkdownStore(){            
            return this.$store.getters.getLessonEditor.markdownText;
        },

        /** résumé lecon */
        lessonSummaryStore(){
            return this.$store.getters.getLessonEditor.summary;
        },

        /**
         * thématique
         */
        lessonThematicStore(){
            if(this.$store.getters.getLessonEditor?.thematic?.id){
                return this.$store.getters.getLessonEditor.thematic.id;    
            }
            return null;
        }
    },
    /**mise a jour */
    watch: {
        lessonNameStore: function(newValue, oldValue){
            this.lessonName = newValue;
        },

        lessonThematicStore: function(newValue, oldValue) {
            this.lessonThematic = newValue;
        },

        lessonSummaryStore: function(newValue, oldValue){
            this.lessonSummary = newValue;
        },

        lessonMarkdownStore: function(newValue, oldValue){
            this.lessonMarkdown = newValue;
        }

    },
    mounted(){
        this.initialData();
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

.select-option{
    font-size: var(--text_button_size);
}

.form__group--textaera{   
    display: flex; 
    flex-direction: column;    
    justify-content: stretch;
    padding: 10px;
    min-height: 480px;
    height: 45%;
}

.input--textarea{       
    height: 100%;
    border:none;
    border-radius: 0px;
    border-top:0.5px solid white;      
    box-sizing: border-box;
}
</style>