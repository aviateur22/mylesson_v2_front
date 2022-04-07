<template>
  <div class="home__container">
        <div class="main__container-home">
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
                        <LessonButton v-for="(lesson, i) in lessons" :key="i" :data="lesson" :deleteLessonButton="false" :editLesson="false"/>                        
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
        /** récuperation de toutes les lecons disponibles*/
        async getAllLesson(){
            const getAllLesson = await this.$store.dispatch('actionHandler', {action: 'getLessonByTag'});          
            this.$store.commit('setLessonList', getAllLesson);
        }
    },
    created(){
        this.getAllLesson();
    },
    computed: {
        lessons() {            
            return this.$store.getters.getLessonList;
        }
    }
};
</script>

<style scoped>

    .home__container{
        margin-top:var(--navbar_height) ;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;         
        background: var(--main_background_color);
        min-height: calc( 100vh - var(--navbar_height));
    }
    
    .main__container-home{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 100%;
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
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(65, 64, 64)
    }
    
    @media screen and (min-width:768px) {

        .main__container-home{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;           
        }

        .lesson__container{            
            justify-content: flex-start;
        }
    }

    @media screen and (min-width:1024px) {      
        .main__container-home{        
            width: 1024px;                                 
        }  

    }
</style>