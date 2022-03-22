<template>
<div class="home__container">
    <div class="container">
        <!-- titre de la page -->
        <section class="nav__title-container">
            <h2 class="nav__title">bienvenue sur ton compte</h2>
        </section>
        <!-- boutons de navigation -->
        <section class="main__container">          
            <section class="nav__button-container">
                <div class="nav__button">
                    <NavButton v-for="(navButton, i) in navButtons" :key="i" :data="navButton"/>
                </div>
            </section>
            <!-- button de deconnexion -->
            <section class="deconnect__container">
                <Lougout/>
            </section>
        </section>          
    </div> 
</div>  
</template>

<script>
import NavButton from '../components/button/NavButton.vue';
import Lougout from '../components/button/LogoutButton.vue';
import utils from '../helper/utils';

export default {
    components: {
        NavButton,
        Lougout
    },
    data() {
        return {
            navButtons: [
                {
                    title: 'mes informations',
                    link: utils.apiDataUrl.infoPage,
                    imgPath: '/'
                },
                
                {
                    title: 'mes leçons',
                    link: utils.apiDataUrl.userLessonPage.url,
                    imgPath: '/'
                },
                {
                    title: 'nouvelle leçon',
                    link: utils.apiDataUrl.addLessonTypePage.url,
                    imgPath: '/'
                },
                {
                    title: 'modifier droit d\'utilisateur',
                    link: utils.apiDataUrl.updateUserRolePage,
                    imgPath: '/'
                },
                {
                    title: 'Reset base de données',
                    link: utils.apiDataUrl.resetDatabasePage,
                    imgPath: '/'
                }
            ]
        };
    }
};
</script>

<style scoped>

    .home__container{
        width: 100%;
        margin-top: var(--navbar_height);   
        height: calc(100vh - var(--navbar_height));
    }

    .container{
        height: 100%;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;  
        background: white;
    }

    .main__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 2;
    }

    .nav__title{
        text-transform: uppercase;
        font-weight: 700;
        font-size:1.2rem ;
        padding:40px 0px
    }

    .nav__button{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .deconnect__container{
        width: 100%;
    }

    @media screen and (min-width:768px) {

        .nav__button{            
            justify-content: space-between;
            align-items: stretch;
            flex-wrap: wrap;           
        }
        
        .container{        
            width: 768px;     
            height: 100vh;                   
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

    }

</style>