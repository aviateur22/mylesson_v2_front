<template>
<!-- cooke info -->
<transition name="slide-fade">
    <div v-if="cookieDisplayInfo" class="cookie__main-container">
        <!-- contenu principal -->
        <article class="article">
            <!-- titre -->
            <header class="article__header">
                <h2 class="article__title"> Nos cookies</h2>
            </header>
            <!-- main -->
            <main class="article__main">
                <p class="article__content">Nous utilisons des cookies et ils sont indispensable au bon fonctionement du site.</p>
            </main>
            <!-- bouton fermeture -->
            <footer class="article__footer">
                <button @click="hideCookieInfo" class="article__button"> ok pour moi</button>
            </footer>
        </article>
    </div>
</transition>
</template>

<script>
export default {
    name: 'cookieInformation',
    data(){
        return {
        };
    },
    methods: {
        /**
         * masque la banniere information des cookies
         */
        hideCookieInfo(){
            this.$store.commit('setCookieBanner', !this.cookieDisplayInfo);
        }

    },
    computed: {
        cookieDisplayInfo(){
            return this.$store.getters.getCookieBannerState;
        }
    }
};
</script>

<style scoped>
        .slide-fade-enter-active {            
            animation: slide-fade-in var(--transition_time_long);
        }

        .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }

        .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {            
            opacity: 0; 
            transform: translateX(-400px);
        }

        @keyframes slide-fade-in {
            0% {
                transform: translateX(-400px);
            }
            100% {
                transform: translateX(0px);
            }
        }

    .cookie__main-container{
        position: fixed;
        top: 60vh;
        left: 0px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        max-width: 90%;
        width: 300px;
        height: 170px;
        border-radius: 10px;
        background: white;
        background-image: url('../../assets/img/cookie.png');        
        background-position: top right;
        object-fit: contain;
        background-repeat: no-repeat;
        overflow: hidden;  
        margin-left: 10px;
    }

    .article{
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }

    .article__header{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 20px 0px;
        color: var(--main_color);
        font-weight: 800;
        font-size: var(--form_title_size);
    }

    .article__title{
        text-align: left;
    }

    .article__main{
        display: flex;
        width: 100%;
        padding: 10px 30px;
        border-bottom: 0.1px solid rgba(177, 177, 177, 0.5);
        height: 100%;
        align-items: center;

    }

    .article__content{
        letter-spacing: 0.9px;
        font-weight: 700;
        font-size: var(--text_s);
        text-align: justify;
    }

    .article__footer{
        display: flex;
        width: 100%;
        padding: 5px;        
        align-items: center;
        justify-content: center;
        background: var(--main_color);
        
    }

    .article__button{
        border: none;
        width: 100%;
        height: 100%;
        background: var(--main_color);
        text-decoration: none;
        color: rgba(255, 255, 255, 1);
        font-weight: 800;
        transition: all var(--transition_standard) ease-in;
        cursor: pointer;
    }

    .article__button:hover{
        font-weight: 900;

    }

</style>