<template>
<!-- image du média -->
    <div class="Lesson__image-main">
            <div class="Lesson__image-container">
                <!-- image de la lecon -->
                <img class="Lesson__image" :src="imageLesson" alt="image representant la leçon"/>
                <!-- floutage de l'image -->
                <div class="lesson__blur"/>
            </div>
    </div>
</template>

<script>
import utils from '../../helper/utils';
export default {
    name: 'lessonImage',
    data(){
        return {
            //imageLesson: null,
        };
    },
    methods: {       
        /** 
         * récuperation des images github et likedin
         */
        async getLessonImage(){
        }
    },
    computed: {        
        /** image du site */
        lesson(){
            return this.$store.getters.getLessonEditor.lessonImageUrl;
        },

        /** url du site  */
        imageLesson(){
            return utils.baseUri + this.lesson;
        }
    },
    async created(){
        //await this.getMediaImage();
    }
};
</script>

<style scoped>
    .Lesson__image-main{      
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        height: 350px;
    }

    .Lesson__image-container{
        width: 100%;        
        position: relative;
    }

    .Lesson__image{
        width: 100%;
        height: 350px;
        object-fit:cover;
        object-position: center center;
    }

    .lesson__blur{
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(4px);
        background: rgba(0, 0, 0, 0.8);
    }

</style>