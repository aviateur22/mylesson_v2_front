<template>
  <div @click="displayLessonClick(this.actionClickName)" class="lesson__button-container">
    <div class="main__container">
      <div class="button__container">
        <section class="button__title-container">
            <!-- date de creation -->
            <span class="button__date">{{data.created_at}}</span>
            <!-- titre de la leçon -->
            <h3 class="button__title">{{ data.title }}</h3>
            <!-- tags de la lecon -->
            <section class="button__tag-container">
                <div class="button__tag">
                    <LessonTag v-for="(tag,id) in data.tags" :key="id" :data='tag'/>
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
    props: ['data', 'actionClickName'],
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
        displayLessonClick(actionClickName){
            this.$store.dispatch('actionHandler', {action: actionClickName, data: this.data});
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
        padding:15px 0px;
        cursor: pointer;      
        width:95%;
        background: rgb(255, 255, 255);
    }

    .button__title-container{
        margin: 10px 0px;

    }

    .button__date{
        font-size: var(--text_s);
        color: rgb(83, 83, 83);
        padding: 10px;
        text-transform: uppercase;
    }

    .button__title{
        padding: 5px;
        text-transform: uppercase;
        font-weight: 800;
        font-size: var(--text_button_size);
    }

    .button__tag-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button__tag{
        display: flex;
    }

    @media screen and (min-width:560px) {
        .lesson__button-container{   
            margin: 10px;     
            width:calc( 50% - 20px); 
        }
    }

</style>