<template>
<!-- données sur la date de création de la lecon -->
    <div class="date__main-container">
        <div class="date__container">        
            <div class="date__create-container">
                <span class="date__text">{{ this.lesson.created }}</span>
            </div>
            <div class="date__update-container">
                <span class="date__text">{{ this.lesson.updated }}</span>
            </div>
        </div>        
    </div>  
</template>

<script>
export default {
    name: 'lessonDate',
    computed: {
        lesson(){
            return this.$store.getters.getLessonEditor;
        }
    }
};
</script>

<style scoped>
    .date__main-container{
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0px;
        right: 0px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .date__container{
        display: flex;    
        flex-direction: column;    
        align-items: flex-start;
    }

    .date__text{
        text-transform: uppercase;
        font-weight: 800;
        font-size: var(--text_s);
        color: white;
    }

</style>