<template>
 <!-- conteneur de tag -->
  <div class="tag__main-container">
      <div class="tag__container">
          <!-- tag -->
          <TagComponent v-for="(tag,i) in tags" :data="tag" :key="i"/>
      </div>
  </div>

</template>

<script>
import TagComponent from './Tag.vue';
export default {    
    name: 'tagContainer',
    components: {
        TagComponent
    },
    computed: {
        /** données de la lecon */
        lesson(){
            return this.$store.getters.getLessonEditor;
        },
        /**list des tags */
        tags(){
            return this.lesson.tags;
        }
    }
};
</script>

<style scoped>
    .tag__main-container{
        display: flex;
        justify-content: center;
    }

    .tag__container{
        display: flex;
        justify-content: center;        
    }

</style>