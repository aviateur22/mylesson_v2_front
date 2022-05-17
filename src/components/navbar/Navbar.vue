<template>
<div class="main__container">    
    <div class="nav__container">       
        <!-- navbar mobile -->
        <transition name="slide-fade">
            <aside  class="nav__mobile"  v-if="navbarMobile">
                <NavbarMobile @toggleNavbarMobile="toggleNavbarMobile"/>        
            </aside>
        </transition>
        
        <nav class="nav">
            <section class="nav__title">
                <div class="nav__title-container">
                    <h1 class="nav__title">                        
                        <router-link class="nav__navlink-item nav--title" to="/">My Lesson</router-link>
                    </h1>
                </div>
            </section>
            <section v-if="!mobileSize" class="nav__items">
                <ul class="nav__list-item">

                    <li v-if="!authenticated" class="nav__navlink">
                        <router-link class="nav__navlink-item" :to="utils.apiDataUrl.loginPage.url">Connexion</router-link>
                    </li>
                    <li v-if="!authenticated" class="nav__navlink">
                        <router-link class="nav__navlink-item" :to="utils.apiDataUrl.signupPage.url">inscription</router-link>
                    </li>
                    <li v-if="authenticated" class="nav__navlink">
                        <router-link class="nav__navlink-item" :to="utils.apiDataUrl.notificationPage.url">
                            <div class="nav__link-group">
                                <p class="navlink__text">Notification</p>
                                <p v-if="notificationCount>0" class="navlink__round">{{notificationCount}}</p>
                            </div>                            
                        </router-link>
                    </li>
                    <li v-if="authenticated" class="nav__navlink">
                        <router-link class="nav__navlink-item" :to="utils.apiDataUrl.homeAccountPage.url">Mon compte</router-link>
                    </li>                    
                </ul>
            </section>
            <section class="nav__burger" v-if="mobileSize && !navbarMobile" @click="toggleNavbarMobile">
                <div class="burger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </section>
        </nav>
    </div>    
</div>  
<router-view/>
</template>

<script>
import NavbarMobile from './NavbarMobile.vue';
import breakPointView from '../../helper/vueBreakPoint';
import utils from '../../helper/utils';

export default {
    name: 'Navbar',
    components: {
        //navbar pour mobile
        NavbarMobile,        
    },
    data() {
        return {
            mobileSize: false,
            navbarMobile: false,
            utils: utils
        };
    },
    methods: {
        /**
         * taille d'affichage
         */
        resizeAction() {
            this.mobileSize = breakPointView.mobileBreakPoint(window.innerWidth);

            //Supprime la navbarMobile
            if(!this.mobileSize) {
                this.navbarMobile = false;
            }
        },

        /**
         * Affiche ou masque la navbar mobile
         */
        toggleNavbarMobile() {
            this.navbarMobile = !this.navbarMobile;
        }

    },
    computed: {
        authenticated() {
            return this.$store.getters.getUserIdent.userAuthenticated;
        },  

        /**nombre de nouvelle notification */
        notificationCount(){
            return this.$store.getters.getNewNotification;
        }
    },
    mounted() {
        window.addEventListener('resize', this.resizeAction);
        this.resizeAction();
    }
};
</script>

<style scoped>

.main__container{
    top: 0px;
    box-shadow: 0px 4px 2px -2px rgba(0, 0, 0, 0.16);
    background: white;
    position: fixed;
    width:100%;
    z-index: 4;
}

.nav__container{
    height: var(--navbar_height);
    max-width: 95%;
    margin: 0px auto;        
}

.nav{
    max-width: 100%;
    display: flex;
    justify-content: space-between;       
    height: 100%;
    align-items: stretch;
}

.nav__title{
    flex-shrink: 2;
    font-size: 1.8rem;
    font-weight: 900;
    display: flex;
    height: 100%; 
    align-items: center;
}

.nav--title{
    color:var(--main_color) !important;
    font-size: 2rem !important;
}

.nav__list-item{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.nav__navlink{
    padding: 0px 10px;
}

.nav__navlink-item{

    color: black ;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    display: flex;
}

.nav__link-group{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.navlink__round{
    position: absolute;
    bottom: -1.4em;
    right: -10px;
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    background: red;
    color: white;
    display: flex;
    align-items: center;    
    justify-content: center;
    font-size: 1.0rem;
    font-weight: bold;
    border: 0.2px solid lightblue;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {  
  opacity: 0;
}

/*#region burger menu*/
.nav__burger{
    display: flex;
    justify-content: center;
    align-items: center;
}

.burger{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 15px;
  cursor: pointer;
}

.line{
  width: 30px;
  height: 3px;
  margin: 2px 0px;
  background-color:black;
  border-radius: 5px;

}
/*#endregion*/

/*#region navbar mobile*/
    .nav__mobile{
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        right: 0px;
        z-index: 10;
    }
/*#endregion*/

@media screen and (min-width:768px) {
    .nav__container{
        display: flex;
        justify-content: center;  
    }

    .nav{        
        width: 768px;
    }
}

@media screen and (min-width:1024px) {
     .nav{
        width: 1024px;
    }
}
</style>