<template>
  <div class="lesson__main-container">
      <div class="lesson__container">
          <div class="lesson__header">
              <div class="lesson__presentation">
                    <TitleComponent/>
                    <div class="lesson__detail">
                        <TagsComponent/>  
                        <DateComponent/> 
                    </div>                          
              </div>
              <div class="lesson__autor">
                    <AutorComponent/>
                    <MediaLinkComponent/>                    
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
        MediaLinkComponent
    },
    methods: {
    },
    computed: {      
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
        padding: 10px 0px;
        background: rgb(231, 231, 231);
        border-bottom: 0.1px solid black;
    }

    .lesson__presentation{
        display: flex;   
        flex-direction: column; 
        padding: 10px 0px; 
    }

    .lesson__detail{
        display: flex;
        flex-direction: column;
         padding: 10px 0px; 
    }

    .lesson__autor{
        display: flex;
        flex-direction: row;  
        padding: 10px 0px;      
        justify-content: center;
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