<template>
<!-- correction du contenu de la lecon -->
<div>
    <div class="delete__lesson-container">
      <SubmitButton @click="updateLesson" :textSubmitButton="'modifier le leçon'"/>
  </div>
</div>  
</template>

<script>
import SubmitButton from '../../button/SubmitButton.vue';
export default {
    name: 'corverLesson',
    components: {
        SubmitButton
    },
    data(){
        return {
        };
    },
    methods: {
        /** modification de la lecon */
        async updateLesson(){
            /** id utilisateur */
            const userId = this.$store.getters.getUserIdent.id;
            const lessonIdParameter = this.lessonId;

            const formData = new FormData();

            /**ajout de id utilisateur  */
            formData.append('userId', userId);

            this.$router.push({name: 'UpdateLesson', params: {slug: this.$store.getters.getLessonEditor.slug}});  

            /** recuperation lecon pason id */ 
            await this.$store.dispatch('actionHandler', {action: 'getLessonById', formData: Object.fromEntries(formData.entries()), lessonId: lessonIdParameter });
        }
    },
    computed: {
        lessonId(){
            return this.$store.getters.getLessonEditor.id;
        }
    }
};
</script>

<style scoped>

</style>