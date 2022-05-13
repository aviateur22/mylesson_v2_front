<template>
  <div class="abusive__main-container">
      <article class="article">
          <!-- auteur  -->
          <header class="article__header"> 
              <div class="article__content">
                  <p class="article__comment"> créateur de la leçon</p>
                  <div class="article__image-container">
                        <img class="article__image" :src="imageSrc" :alt="altImage">
                        <h3 class="article__title">{{data.user_login}}</h3>           
                  </div>                             
              </div>              
          </header>
          <!-- titre de la lecon -->
          <main class="article__main">             
              <div class="article__content">
                  <p class="article__comment"> titre de la leçon</p>
                  <h2 class="article__lesson-title">
                      {{ data.lesson_title}}
                  </h2>                 
              </div>
          </main>
          <!-- bouton -->
          <footer class="article__footer">
               <div class="article__content article--center">
                    <SubmitButton @click="displayLesson" :textSubmitButton="'Voire le contenu'"/>
               </div>
          </footer>
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
        justify-content: center;
        align-items: center;
        
    }

    .article{
        width: 90%;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        padding: 1em;
    }

    .article__header{
        width: 100%;
        padding: 1em;
    }

    .article__content{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .article__comment{
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 800;
        color: var(--secondary_color);
        padding: 1em;
    }

    .article__image{
        width: 4rem;
        height: 4rem;     
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        object-fit: cover;
    }

    .article__main{
        width: 100%;
        padding: 1em;
    }  

    .article__lesson-title{
        text-transform: uppercase;
        font-weight: 800;
        color: var(--main_color);
    }

    .article__footer{
        width: 100%;
        padding: 1em;
    }

    @media screen and ( min-width: 768px) {
        .article{
            max-width: 768px;
            flex-direction: row;
            align-items: stretch;
            
        }

        .article__content{
            justify-content: space-between;
            height: 100%;
        }

        .article__content.article--center{
            justify-content: center;
        }
        .article__lesson-title{
            flex-grow: 2;
        }        
    }

    @media screen and ( min-width: 1024px) {
        .article{
            max-width: 1024px !important;

        }
    }

</style>