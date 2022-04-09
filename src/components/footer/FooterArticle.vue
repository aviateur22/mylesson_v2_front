<template>
    <!-- 1 sous ensemble d'information -->
    <div class="article">
        <div class="aricle__main-container">
            <header @click="toggledisplay" class="article__header">
                <h3 class="article__title">
                    {{ data.title }}
                </h3>
                <div class="arrow"></div>
            </header>
            <main v-if="contentVisible" class="article__main">
                <div class= "article__main-container">
                    <!-- text  -->
                    <div class="article__text">
                        <span v-html="data.content" class="article__content">
                        
                        </span> 
                    </div>
                    <!-- lien externe  -->
                    <div v-if="data.links" class="article__link-container">                        
                        <ArticleLinkComponent v-for="(link, i) in data.links" :data="link" :key="i"/>
                    </div>
                    
                </div>                               
            </main>
        </div>        
    </div>
</template>

<script>
import ArticleLinkComponent from './FooterLink.vue';
export default {
    name: 'footerArticle',
    components: {
        ArticleLinkComponent
    },
    props: ['data'],
    data(){
        return {
            contentVisible: false,
        };
    },
    methods: {
        /**
         * affichage du contenu
         */
        toggledisplay(){
            this.contentVisible = !this.contentVisible;
        }
    }
   
};
</script>

<style scoped>
    .article{
        border: 0.1px solid gray;
        width: 100%;        
        margin: 5px 0px;
        transition: all 10s ease-in;
    }

    .article__header{
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;
        text-align: left;
        background: var(--main_color);
        cursor: pointer;
        display: flex;
        align-items: center;        
    }

    .article__title{        
        color: white;
        font-weight: 700;
        padding-right: 20px;
    }

    .arrow {
        width: 10px;
        height: 10px;
        border: solid rgb(255, 255, 255);
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(-45deg);
        transition: all var(--transition_standard);
    }

    .article__main{
        text-align: left;
        padding: 10px 10px;
        line-height: 1.3;
    }

    .article__content{
        word-break: keep-all;
        text-align: justify;       
    }

    .article__content::v-deep .article__strong{
        font-weight: bolder !important;
    }
</style>