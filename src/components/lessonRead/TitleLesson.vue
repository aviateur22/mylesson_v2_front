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
        justify-content: center;
        align-items: center;
        padding-top: 25px;
        padding-bottom: 10px;
    }

    .lesson__title{
        text-transform: uppercase;
        font-size: var(--form_title_size);
        font-weight: 900;

    }

</style>