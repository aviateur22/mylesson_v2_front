<template>
    <div class="tite__container">
        <h2 class="lesson__title">
            {{this.mainTitle}}
        </h2>
    </div>
</template>

<script>
export default {
    name: 'mainTitle',
    computed: {
        /** données de la lecon */
        lesson(){
            return this.$store.getters.getLessonEditor;
        },
        /** tittre de la lecon */
        mainTitle(){
            return this.lesson.title;
        }
    }
};
</script>

<style scoped>
    .tite__container{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 25px;
        padding-bottom: 10px;
        width: 100%;
    }

    .lesson__title{
        text-transform: uppercase;
        font-size: var(--lesson_title_size);
        font-weight: 700;
        padding-left: 10px;      
        color: white; 

    }

</style>