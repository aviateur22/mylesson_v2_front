<template>
    <div class="lesson__page-container">
      <div class="lesson__page-main">
            <div class="form__title-container">
                <h2 class="form__title">Vos leçons</h2>
            </div>
            <!-- liste les lecon d'un utilisateur -->
            <LessonButtonContainer :lessons="lessons" :deleteLesson = true :editLesson = true />      
      </div>      
    </div>   
</template>

<script>
import LessonButtonContainer from '../components/lessonButtonContainer/ButtonLessonContainer.vue';
export default {
    components: {
        LessonButtonContainer
    },
    data(){
        return {            
        };
    },
    methods: {
        async getLessonByUserId(){
            const getUserLesson = await this.$store.dispatch('actionHandler', { action: 'getLessonByUserId' });                        
        }
    },
    computed: {
        /** liste lcons utilisateur */
        lessons(){
            return this.$store.getters.getUserLesson;
        }

    },
    created(){
        this.getLessonByUserId();
    }
};
</script>

<style scoped>
    .lesson__page-container {    
        margin-top:var(--navbar_height);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;  
        min-height: calc(100vh - var(--navbar_height));
    }

    .lesson__page-main {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        width: 100%;
        background:white;
        min-height: calc(100vh - var(--navbar_height));
    }

    .form__title-container{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .form__title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
        padding:40px 0px
    }

    .form__lesson-container{
        width: 100%;        
    }

    .form__lesson-button{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (min-width:560px) {
       .form__lesson-container{
            display: flex;
        }

        .form__lesson-button{
            flex-direction: row;
            flex-wrap: wrap;
            margin: 0px auto;
            width: 100%;
        }

    }

    @media screen and (min-width:768px) {

        .lesson__page-main {        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

    @media screen and (min-width:1024px) {      
        .lesson__page-main{        
            width: 1024px;                                 
        }  

    }

</style>