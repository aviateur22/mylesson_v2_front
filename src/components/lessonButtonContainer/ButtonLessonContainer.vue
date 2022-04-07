<template>
    <!-- contenu de toutes les lecons -->
    <section v-if="lessons?.length > 0" class="lesson__section">
        <div class="lesson__main-container">                    
            <div class="lesson__container">
                <LessonButton v-for="(lesson, i) in lessons" :key="i" :data="lesson" :deleteLessonButton="deleteLesson" :editLesson="editLesson">
                    <!-- modal de confirmation de suppression -->
                    <ModalComponent/>
                </LessonButton>                        
            </div>                    
        </div>
    </section>
    <!-- si pas de lecon - message  -->
    <section v-else class="lesson__empty-container">
        <div class="lesson__empty-text">                            
            <h3 class="empty__text"> Pas de leçon</h3>
        </div>                        
    </section>  
</template>

<script>
import LessonButton from '../button/lessonsButtons/LessonButton.vue';
import ModalComponent from '../modal/Modal.vue';
export default {
    name: 'lessonButtonContainer',
    props: ['lessons', 'deleteLesson', 'editLesson'],
    components: {
        LessonButton,
        ModalComponent
    }
};
</script>

<style scoped>
    .lesson__main-container{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;

    }

    .lesson__container{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start ;
        justify-content: flex-start;
        padding-top: 20px;
        margin: 0px auto;
        max-width: 90%;
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
</style>