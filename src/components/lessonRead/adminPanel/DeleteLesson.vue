<template>
  <div class="delete__lesson-container">
      <SubmitButton @click="deleteLesson" :textSubmitButton="'supprimer la leçon'"/>
  </div>
</template>

<script>
import SubmitButton from '../../button/SubmitButton.vue';
export default {
    name: 'deleteLesson',    
    components: {
        SubmitButton
    },
    props: ['token'],
    data(){
        return {           
        };
    },
    methods: {
        async deleteLesson(){
            /** formdata */
            const formData = new FormData();

            /** id utilisateur */
            const userId = this.$store.getters.getUserIdent.id;

            /**ajout de id utilisateur  */
            formData.append('userId', userId);

            formData.append('formToken', this.token);

            await this.$store.dispatch('actionHandler', {action: 'adminDeleteLessonById', formData: Object.fromEntries(formData.entries())});
        },        
    }
};
</script>

<style scoped>
    .delete__lesson-container{
       
    }

</style>