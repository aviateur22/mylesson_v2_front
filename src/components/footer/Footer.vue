<template>
  <div class="footer__main-container">
      <div class="footer__container">
          <!-- a propos -->
            <CategoryComponent/>
          <!-- markdown -->

          <!-- conditions legales -->

          <section class="thematic">
              <div class="thematic__container">
                  <div class="thematic__title-container">
                      <h3 class="thematic__title">a propos</h3>
                  </div>
                  <div class="thematic__body">
                      <span class="thematic__item">qui je suis</span>
                      <span class="thematic__item">contenu des leçons</span>
                  </div>
              </div>
          </section>
          <section class="thematic">
              <div class="thematic__container">
                  <div class="thematic__title-container">
                      <h3 class="thematic__title">markdwon</h3>
                  </div>
                  <div class="thematic__body">
                      <span class="thematic__item">qu'est ce que le markdown</span>
                      <span class="thematic__item">liens utiles markdown</span>                      
                  </div>
              </div>
          </section>
           <section class="thematic">
              <div class="thematic__container">
                  <div class="thematic__title-container">
                      <h3 class="thematic__title">informations légales</h3>
                  </div>
                  <div class="thematic__body">
                      <span class="thematic__item">cookie</span>
                      <span class="thematic__item">CGU</span>                      
                  </div>
              </div>
          </section>
      </div>
  </div>
</template>

<script>
import CategoryComponent from './FooterSubcategory.vue';
export default {
    components: {
        CategoryComponent
    },
    data(){
        return {
            aboutItems: {
                items: ['qui je suis', 'contenu des leçons'],
                title: 'à propos'
            },
            markdownItems: {
                items: ['qu\'est ce que le markdown', 'liens utiles markdown'],
                title: 'markdwon'
            },
            LegalInfoItems: {
                items: ['cookie', 'CGU'],
                title: 'informations légales'
            }
        };
    },
};
</script>

<style scoped>
    .footer__main-container{   
        padding: 20px 10px;
        display: flex;
        width: 100%;  
        justify-content: center; 
        align-items: center;
    }

    .footer__container{
        width: 100%;
        display: flex;    
        align-items:center ;
        justify-content: space-between;
    }
    
    @media screen and (min-width:768px) {

        .footer__main-container{        
            width: 768px;
        }
    }

    @media screen and (min-width:1024px) {      
        .footer__main-container{        
            width: 1024px;                                 
        }  

    }

</style>