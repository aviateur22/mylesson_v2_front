<template>
  <div class="check__main-container">
      <article class="article__container">
          <header class="article__header">
            <p class="article__text">lecons avec contenu abusif</p>
          </header>
          <main class="article__main">
              <section v-if="AbusiveLessons.length===0" classe="article__main-empty">
                  <p> aucune leçon avec un contenu abusif</p>
              </section>
              <section v-else class="article__main-lesson">
                  <AbusiveContentComponent v-for="(lesson, id) in AbusiveLessons" :key="id" :data="lesson"/>
              </section>
          </main>
      </article>
  </div>
</template>

<script>
import AbusiveContentComponent from '../../components/admin/lessonContentAbusive/AbusiveContent.vue';
export default {
    components: {
        AbusiveContentComponent
    },
    data(){
        return {
            AbusiveLessons: []
        };
    },
    methods: {
        /**
         * récuperation des lecons avec contenu abusifs 
         */
        async getAllAbusiveContent(){
            const data = await this.$store.dispatch('actionHandler', {action: 'getAllAbusiveLesson'});
            this.AbusiveLessons = data;
        }
    },
    created(){
        this.getAllAbusiveContent();
    }

}
</script>

<style scoped>
    .check__main-container{
        width: 100%;
        margin-top: var(--navbar_height);   
        min-height: calc(100vh - var(--navbar_height));
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
    }

    .article__container{
        min-height: calc(100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
    }

    .article__text{
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--form_title_size);
        padding:40px 0px
    }

    .article__main{
        width: 100%;
    }

    .article__main-lesson{
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        .article__container{
            width: 768px;
             box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        
    }

    @media screen and (min-width: 1024px) {
        .article__container{
            width: 1024px;
        }
        
    }

</style>