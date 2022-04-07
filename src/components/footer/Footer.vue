<template>
  <div class="footer__main-container">
      <div class="footer__container">
            <!-- a propos -->
            <CategoryComponent :dataItems="aboutItems"/>
            <!-- markdown -->
            <CategoryComponent :dataItems="markdownItems"/>
            <!-- conditions legales -->     
            <CategoryComponent :dataItems="LegalInfoItems"/>           
      </div>
  </div>
</template>

<script>
import utils from '../../helper/utils';
import CategoryComponent from './FooterSubcategory.vue';
export default {
    components: {
        CategoryComponent
    },
    data(){
        return {
            aboutItems: {
                items: [
                    {
                        text: 'Qui je suis',
                        url: utils.apiDataUrl.abouteMe.url
                    },
                    {
                        text: 'Contenu des leçons',
                        url: utils.apiDataUrl.lessonPresentation.url
                    }
                ],
                title: 'à propos'
            },
            markdownItems: {
                items: [
                    {
                        text: 'Qu\'est ce que le markdown',
                        url: utils.apiDataUrl.aboutMarkdown.url
                    },
                    {
                        text: 'Liens utiles markdown',
                        url: utils.apiDataUrl.linksMarkdown.url
                    }
                ],
                title: 'markdown'
            },
            LegalInfoItems: {
                items: [
                    {
                        text: 'Cookie',
                        url: utils.apiDataUrl.cookie.url
                    },
                    {
                        text: 'CGU',
                        url: utils.apiDataUrl.cgu.url
                    }                
                ],
                title: 'informations légales'
            }
        };
    },
};
</script>

<style scoped>
    .footer__main-container{   
        padding: 20px 40px;
        display: flex;    
        width: 100%;  
        justify-content: center; 
        align-items: center;        
        background: rgb(65, 64, 64);
        height: 100%;
    }

    .footer__container{
        width: 100%;
        display: flex;   
        flex-direction: column; 
        align-items:center ;
        justify-content: space-between;
    }
    
    @media screen and (min-width:768px) {

        .footer__main-container{        
            width: 768px;
        }

        .footer__container{
            width: 100%;
            display: flex;    
            flex-direction: row;
            align-items:center ;
            justify-content: space-between;
        }
    }

    @media screen and (min-width:1024px) {      
        .footer__main-container{        
            width: 1024px;                                 
        }  

    }

</style>