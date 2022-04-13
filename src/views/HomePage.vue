<template>
  <div class="home__container">
        <div class="main__container-home">    
            <BannerComponent/>
            <section class="tag__section">
                <div class="tag__main-container">
                    <div class="tag__container">
                        <MarkdownTag  :title="'Ajouter un ou plusieurs tag(s) pour filtrer les leçons'" :filterLesson="true" ref="markdownTag" class="lesson__tag-selection"/>
                    </div>
                </div>
            </section>
            <!-- liste toutes les lecons disponible -->
            <LessonButtonContainer :lessons="lessons" :deleteLesson=false :editLesson=false />            
      </div>   
    <section class="footer">
        <Footer/>
    </section>   
  </div>
</template>

<script>
import MarkdownTag from '../components/TagLesson/MarkdownTag.vue';
import Footer from '../components/footer/Footer.vue';
import LessonButtonContainer from '../components/lessonButtonContainer/ButtonLessonContainer.vue';
import BannerComponent from '../components/banner/HomeBanner.vue';
export default {
    components: {
        MarkdownTag,
        Footer,
        LessonButtonContainer,
        BannerComponent
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