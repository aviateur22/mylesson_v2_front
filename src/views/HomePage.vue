<template>
  <div class="home__container">
        <div class="main__container">
            <section class="title__section">
                <div class="tite__home-container">
                    <h2 class="title"> Page Principale </h2>
                </div>
            </section>        
            <section class="tag__section">
                <div class="tag__main-container">
                    <div class="tag__container">
                        <MarkdownTag :filterLesson="true" ref="markdownTag" class="lesson__tag-selection"/>
                    </div>
                </div>
            </section>
            <section class="lesson__section">
                <div class="lesson__main-container">
                    <div class="lesson__container">
                        <LessonButton v-for="(lesson, i) in lessons" :key="i" :data="lesson" :editLesson="false"/>                        
                    </div>
                </div>
            </section>
      </div>   
    <section class="footer">
        <Footer/>
    </section>   
  </div>
</template>

<script>
import MarkdownTag from '../components/TagLesson/MarkdownTag.vue';
import LessonButton from '../components/button/lessonsButtons/LessonButton.vue';
import Footer from '../components/footer/Footer.vue';
export default {
    components: {
        MarkdownTag,
        LessonButton,
        Footer
    },
    data() {
        return {            
        };
    },
    methods: {
        getLesson(){
            this.$store.dispatch('actionHandler', {action: 'getLessons'});
        }
    },
    computed: {   
        lessons(){
            return this.$store.getters.lessonsStateGet;
        }     
    },
    created(){
        this.getLesson();
    }
};
</script>

<style scoped>

    .home__container{
        margin-top:var(--navbar_height) ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        background: red;  
        background: var(--main_background_color);
    }
    
    .main__container{
        width:100%;
        display: flex;
        flex-direction: column;
    }

    .lesson__container{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start ;
        justify-content: center;
        background: transparent;
        background: var(--main_background_color)
    }

    .footer{
        width: 100%;
    }
    
    @media screen and (min-width:768px) {

        .main__container{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;           
        }

        .lesson__container{            
            justify-content: flex-start;
        }
    }

    @media screen and (min-width:1024px) {        

    }
</style>