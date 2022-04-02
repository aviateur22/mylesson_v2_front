<template>
  <div class="link__container">
      <div class="link">
          <Link v-for="(link,i) in links" :data="link" :key="i"/>
      </div>
  </div>
</template>

<script>
import Link from './MediaLink.vue';
export default {
    name: 'mediaLink',
    components: {
        Link
    },    
    computed: {
        /** lecon */
        lesson(){
            return this.$store.getters.getLessonEditor;
        },

        /** liste des liens de l'auteur ' ex: github ou linkedin ...' */
        links(){
            return this.lesson.autorLinks;
        }
    }
};
</script>

<style scoped>
    .link {
        display: flex;
    }

</style>