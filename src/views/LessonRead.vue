<template>
  <div class="lesson__main-container">
      <div class="lesson__container">
          <!-- presentation de la lecon -->
          <div class="lesson__header">
              <div class="lesson__presentation">
                    <TitleComponent/>
                    <div class="lesson__detail">
                        <TagsComponent/>
                        <!-- image + autor + date -->
                        <div class="lesson__inner">
                            <ImageLessonComponent/>
                            <DateComponent/> 
                            <div class="lesson__autor">
                                <AutorComponent/>
                                <MediaLinkComponent/>                    
                            </div>
                        </div>
                    </div>                          
              </div>                                    
          </div>
          <div class="lesson__body">
              <ContentComponent/>
          </div>          
      </div>
  </div>
</template>

<script>
import TitleComponent from '../components/lessonRead/TitleLesson.vue';
import AutorComponent from '../components/lessonRead/Autor.vue';
import DateComponent from '../components/lessonRead/LessonDate.vue';
import TagsComponent from '../components/lessonRead/TagContainer.vue';
import ContentComponent from '../components/lessonRead/Content.vue';
import MediaLinkComponent from '../components/lessonRead/MediaLinkContainer.vue';
import ImageLessonComponent from '../components/lessonRead/ImageLesson.vue';
export default {
    name: 'lessonRead',
    data(){
        return {
            
        };
    },
    components: { 
        AutorComponent,
        DateComponent,
        TagsComponent,
        ContentComponent,
        TitleComponent,
        MediaLinkComponent,
        ImageLessonComponent
    },
    methods: {
        /** récuperation lecon par slug */
        async getLesson(){
            /** récuperation du slug de la lecon */
            const slug = this.$route.params.slug;

            /** si pas de slug */
            if(!slug){
                throw new Error('pas de slug');
            }

            /** récupération par slug */
            const data = await this.$store.dispatch('actionHandler', {action: 'getLessonBySlug', slug });
        }
    },
    computed: {      
    },
    created(){
        /** récuperation lecon par slug present dans l'url */
        this.getLesson();
    },
    async beforeRouteLeave(to, from, next) {        
        /** vide les données de le lecon en lecture */
        this.$store.commit('setLesson', {});
        next();
    }

};
</script>

<style scoped>
    .lesson__main-container{
        margin-top:var(--navbar_height) ;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        justify-content: center;        
    }

    .lesson__container{
        background: white;
        width: 100%;
    }

    .lesson__header{
        display: flex;
        flex-direction: column;        
        background: rgb(247, 247, 247);
        border-bottom: 0.1px solid black;
    }

    .lesson__presentation{
        display: flex;   
        flex-direction: column;         
    }

    .lesson__detail{
        display: flex;
        flex-direction: column; 
    }

    .lesson__inner{
        position: relative;
        width: 100%;
        height: 350px;
    }

    .lesson__autor{
        display: flex;
        flex-direction: row;  
        padding: 10px 0px;      
        justify-content: center;
        position: absolute;
        top: 0px;
    }

    @media screen and (min-width:768px) {

        .lesson__container{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

    @media screen and (min-width:1024px) {  
        .lesson__container{    
            width: 1024px;
        }
    }

</style>