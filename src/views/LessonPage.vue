<template>
    <div class="container">
      <div class="form__container">
            <div class="form__title-container">
                <h2 class="form__title">Vos leçons</h2>
            </div>
            <div class="form__lesson-container">
                <div class="form__lesson-button">
                    <LessonButton v-for="(lesson, id) in this.lessons" :key="id" :data="lesson" :editLesson="true"/>
                </div>                
            </div>       
      </div>      
    </div>   
</template>

<script>
import LessonButton from '../components/button/lessonsButtons/LessonButton.vue';
export default {
    components: {
        LessonButton        
    },
    methods: {
        async getLesson(){
            await this.$store.dispatch('actionHandler', { action: 'getLessonsAction' });                        
        }
    }, 
    computed: {
        lessons(){
            return this.$store.getters.userLessonStateGet;
        }
    },
    created(){
        this.getLesson();
    }
};
</script>

<style scoped>
    .container{    
        margin-top:var(--navbar_height);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
        background: white;
    }

    .form__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        background:var(--main_background_color);
        height: 100%;
    }

    .form__title-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form__title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
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

        .form__container{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

</style>