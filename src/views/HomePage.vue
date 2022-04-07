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
            <section v-if="lessons.length > 0" class="lesson__section">
                <div class="lesson__main-container">                    
                    <div class="lesson__container">
                        <LessonButton v-for="(lesson, i) in lessons" :key="i" :data="lesson" :deleteLessonButton="false" :editLesson="false"/>                        
                    </div>                    
                </div>
            </section>
            <section v-else class="lesson__empty-container">
                <div class="lesson__empty-text">                            
                    <h3 class="empty__text"> Pas de leçon</h3>
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
        min-height: calc( 100vh - var(--footer_height) - var(--navbar_height));
        background: white;
    }

    .lesson__container{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start ;
        justify-content: center;
        padding-top: 20px;
    }

    .lesson__empty-container{
        display: flex;
        width: 100%;
        align-items: stretch;
        justify-content: center;
        height: 100%;
    }

    .lesson__empty-text{
        display: flex;
        align-items: stretch;
        height: 100%;
        justify-content: center;
        width: 100%;
    }

    .empty__text{
        padding-top: 30px;
        text-transform: uppercase;
        font-size: var(--form_title_size);
        font-weight: 800;

    }

    .footer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: var(--footer_height);
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