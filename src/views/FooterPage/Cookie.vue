<template>
    <div class="about__container">
        <div class="about__inner-container">
            <!-- background -->
            <div class="about__background"></div>
            <article class="article">
                <div class="article__header">
                    <h2 class="title"> les cookies </h2>
                </div>
                <div class="article__main">
                    <!-- text de description -->
                    <section class="article__text-container">
                        <span class="article__text">                            
                            Ce site utilise des cookies pour fonctionner.
                        </span>
                    </section>

                </div>
            </article>
        </div>

    </div>
</template>

<script>
export default {
    name: 'abouteMe'
};
</script>

<style scoped>
    .about__container{    
        margin-top:var(--navbar_height) ;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
        width: 100%;
    }

    .about__inner-container{
        position: relative;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
        background: white;
        z-index: 1;
        overflow-x: hidden;
    }

    .about__background{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-image:
        linear-gradient(to bottom, rgba(99, 99, 99, 0.62), rgba(15, 15, 15, 0.873)),
        url('../../assets/img/background.png');
        background-position: center, center;
        background-size: cover;
        filter: blur(4px);
        z-index: -1;
    }

    .article {
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        padding: 0px 50px;
    }

    .article__header{
        padding: 40px 0px;
        flex-grow: 2;
    }

    .title{
        font-weight: 900;
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
        color: rgb(36, 36, 36);
    }

    .article__main{
       flex-grow: 3;
    }

    .article__text-container{
        word-break: keep-all;
        text-align:justify;
    }

    .article__text {
       display: block;
       padding: 10px 0px;
       line-height: 1.3;
       color: white;

    }

    @media screen and (min-width:768px) {

        .about__inner-container{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

    @media screen and (min-width:1024px) { 

        .about__inner-container{        
            width: 1024px;
        }        
    }

</style>