<template>
    <div class="footer__article-page">
        <div class="footer__article-container">
            <div class="footer__article-title">
                <!-- titre principal de la page -->
                <h2 class="footer__title">
                    {{ activeData.title }}
                </h2>
            </div>
            <div class="footer__page-article">
                <!-- articles avec chacun: 1 titre et 1 contenu  -->
                <FooterArticleComponent v-for="(article, i) in activeData.articles" :data="article" :key="i"/>
            </div>
        </div>        
    </div>
</template>

<script>
import FooterArticleComponent from '../components/footer/FooterArticle.vue';
import utils from '../helper/utils';
export default {
    name: 'abouteMe',
    components: {
        FooterArticleComponent
    },
    props: ['articles', 'title'],
    data(){
        return {            
            /** données pour ma présentation */
            aboutMe: this.$store.getters.getAboutMePresentation,

            /** données présentation des leçons */
            lessonPresentation: this.$store.getters.getLessonPresentation,

            /** le markdown */
            markdownPresentation: this.$store.getters.getMarkdownPresentation,

            /** information légal */
            legalNotice: this.$store.getters.getLegalNotice,

            /** les cookies */
            cookiePresentation: this.$store.getters.getCookiePresentation,

            /** cgu */
            cguPresentation: this.$store.getters.getCgu,

            /** données retenu pour affichage de l'article */
            activeData: {}
        };
    },
    methods: {
        /** récuperation du slug présent dans l'url */
        getSlug(){
            const slug = this.$route.params.slug;

            if(!slug){
                /** faire un message comme quoi le contenu n'est pas trouvé */
                this.$route.push({ name: utils.apiDataUrl.notFound.url });
            }

            /** chargement du contenu de la page */
            this.activeData = this.getArticleData(slug);           
        },

        /** récupération de données  pour la page*/
        getArticleData(slug){            
            switch (slug){
            /** about me data */
            case utils.apiDataUrl.abouteMe.slug: 
                return this.aboutMe;        

            /** presentation des lecons */        
            case utils.apiDataUrl.lessonPresentation.slug:
                return this.lessonPresentation;
            
            /** le markdown */
            case utils.apiDataUrl.aboutMarkdown.slug:
                return this.markdownPresentation;
            
            /** informations légal */
            case utils.apiDataUrl.legalNotice.slug:
                return this.legalNotice;

            /** les cookies du sites */
            case utils.apiDataUrl.cookie.slug:
                return this.cookiePresentation;

            /**cgu */    
            case utils.apiDataUrl.cgu.slug:
                return this.cguPresentation;

            default:
                return null; 
            }
        }
    },
    created(){
        this.getSlug();
    }
};
</script>

<style scoped>
    .footer__article-page{
        margin-top:var(--navbar_height) ;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .footer__article-container{
        display: flex;
        flex-direction: column;
        min-height: calc( 100vh - var(--navbar_height));
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .footer__article-title{
        display: flex;
        width: 100%;
        align-items: flex-start;
        justify-content: center;
        padding-top: 20px;
        padding-bottom: 40px;
    }

    .footer__title{
        text-transform: uppercase;
        font-size: var(--form_title_size);
        padding-top: 30px;
    }

    .footer__page-article{
        flex-grow: 3;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        flex-direction: column;
    }

    @media screen and (min-width:768px) {

        .footer__article-container{        
            width: 768px;          
        }
    }

    @media screen and (min-width:1024px) { 
        .footer__article-container{
            width: 1024px;
        }

    }
</style>