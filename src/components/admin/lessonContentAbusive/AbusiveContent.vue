<template>
  <div class="abusive__main-container">
      <article class="article">
          <!-- auteur  -->
          <header class="article__header"> 
              <div article__title-container>
                    <img :src="imageSrc" :alt="altImage">
                    <p class="article__title">{{data.user_login}}</p>                    
              </div>              
          </header>
          <main>
              <!-- titre de la lecon + button voir plus -->
              <div class="article__main-content">
                  <p> titre: {{ data.lesson_title}}</p>
                  <SubmitButton @click="displayLesson" :textSubmitButton="'Voire le contenu'"/>
              </div>
          </main>
      </article>
  </div>
</template>

<script>
import SubmitButton from '../../button/SubmitButton.vue';
import utils from '../../../helper/utils';
export default {
    name: 'abusiveContent',
    components: {
        SubmitButton
    },
    props: ['data'],
    data(){
        return {           
            imageSrc: utils.baseUri + utils.userApi.getAvatarByKey.endPoint.replace(':key', this.data.user_image),
            altImage: 'avatar de ' + this.data.user_login
        };
    },
    methods: {        
        /**
         * affichage de la lesson
         */
        displayLesson(){
            return this.$router.push({name: 'ReadLesson', params: {slug: this.data.lesson_slug}});
        }
    },
    created() {       
    }
};
</script>

<style scoped>
    .abusive__main-container{
        width: 100%;
        display: flex;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }

    .article{

    }

</style>