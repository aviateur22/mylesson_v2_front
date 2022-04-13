<template>
<div class="account__main-container">
    <div class="account__container">
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
        </section>    
         <!-- button de deconnexion -->
        <section class="deconnect__container">
            <Lougout/>
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
                    link: utils.apiDataUrl.infoPage.url,
                    imgPath: '/',
                    userRole: 1,
                    imageName: 'home.png'
                },
                
                {
                    title: 'mes leçons',
                    link: utils.apiDataUrl.userLessonPage.url,
                    imgPath: '/',
                    userRole: 2,
                    imageName: 'lesson.png'
                },
                {
                    title: 'nouvelle leçon',
                    link: utils.apiDataUrl.addLessonTypePage.url,
                    imgPath: '/',
                    userRole: 2,
                    imageName: 'newLesson.png'
                },
                {
                    title: 'modifier droit d\'utilisateur',
                    link: utils.apiDataUrl.updateUserRolePage,
                    imgPath: '/',
                    userRole: 3,
                    imageName: 'css.png'
                },
                {
                    title: 'Reset base de données',
                    link: utils.apiDataUrl.resetDatabasePage,
                    imgPath: '/',
                    userRole: 4,
                    imageName: 'css.png'
                }
            ]
        };
    }
};
</script>

<style scoped>

    .account__main-container{
        width: 100%;
        margin-top: var(--navbar_height);   
        min-height: calc(100vh - var(--navbar_height));
    }

    .account__container{
        min-height: calc(100vh - var(--navbar_height));
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
        width: 100%;   
    }

    .nav__title{
        text-transform: uppercase;
        font-weight: 700;
        font-size:1.2rem ;
        padding:40px 0px
    }

    .nav__button-container{
        display: flex;
        width: 100%;
    }
    .nav__button{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
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
        
        .account__container{        
            width: 768px;                   
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

    }

    @media screen and (min-width:1024px) {

        .nav__button{            
            justify-content: space-between;
            align-items: stretch;
            flex-wrap: wrap;           
        }
        
        .account__container{        
            width: 1024px;                  
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

    }

</style>