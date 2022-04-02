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
        <!-- contenue de l'image -->
        <section class="button__img-container">

        </section>
        <!-- extrait du contenu -->
        <section class="button__content-container">
            <div class="lesson__markdown-text">
                <div class="markdown-body">
                    <span v-html="this.lessonsHtml" ></span>
                </div>
            </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import LessonTag from './LessonTag.vue';
import MarkdownHandler from '../../../helper/markdown/markdownConverter';
export default {    
    name: 'LessonButton',
    components: {
        LessonTag
    },
    /**
     * editLesson: true => ouverture lecon en ecriture
     * editLesson: false => ouverture lecon en lecture
     */
    props: ['data', 'editLesson'],
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
            this.$store.dispatch('actionHandler', {action: 'getLessonById', lessonId: this.data.id, editLesson: this.editLesson});
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

    .lesson__button-container{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 5px;
        margin: 10px 0px;
        
        cursor: pointer;      
        width:95%;
        background: rgb(255, 255, 255);
        height: 400px;
        
        overflow: hidden;
    }

    .button__title-container{
        padding: 15px 5px;
        background: rgb(107, 107, 107);

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
        width: 100%;
        text-align: left;
       
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