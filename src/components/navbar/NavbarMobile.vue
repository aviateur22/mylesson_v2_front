<template>
    <div class="nav__container">
        <div class="nav__close-button-container">
            <button @click="toggleNavbarMobile" class="nav__close-button">
                <svg viewBox="0 0 352 512"><path  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
            </button>
        </div>
        <nav class="nav">
            <div class="nav__title-container">
                <h1 class="nav__title">
                    <router-link @click="toggleNavbarMobile" class="nav__navlink-item title--size" to="/">My Dev Lesson</router-link>
                </h1>
            </div>
            <div class="nav__item-container">
                <section class="nav__items">
                    <ul class="nav__list-item">
                        <!-- utilisateur non connecté -->
                        <li v-if="!authenticated" class="nav__navlink">
                            <router-link @click="toggleNavbarMobile" class="nav__navlink-item" :to=this.baseUrl.loginPage.url>Connexion</router-link>
                        </li>
                        <li  v-if="!authenticated" class="nav__navlink">
                            <router-link @click="toggleNavbarMobile" class="nav__navlink-item" :to=this.baseUrl.signupPage.url>inscription</router-link>
                        </li>
                        <!-- utilisateur connecté -->
                        <div v-if="authenticated" class="">
                            <li class="nav__navlink">
                                <router-link @click="toggleNavbarMobile" class="nav__navlink-item" :to=this.baseUrl.homeAccountPage.url>mon compte</router-link>
                            </li>
                            
                            <!-- notification -->
                            <li v-if="userRole >= 2" class="nav__navlink">
                                <router-link @click="toggleNavbarMobile" class="nav__navlink-item" :to=this.baseUrl.notificationPage.url>
                                    <div class="nav__link-group">
                                        <p class="navlink__text">Notification</p>
                                        <p v-if="notificationCount>0" class="navlink__round">{{notificationCount}}</p>
                                    </div>                            
                                </router-link>
                            </li>
                            <!-- role admin et super admin -->
                            <li v-if="userRole >= 3" class="nav__navlink">
                                <router-link @click="toggleNavbarMobile" class="nav__navlink-item" :to=this.baseUrl.updateUserRolePage.url>modifier droit d\'utilisateur</router-link>
                            </li>
                            <li v-if="userRole >= 4" class="nav__navlink">
                                <router-link @click="toggleNavbarMobile" class="nav__navlink-item" :to=this.baseUrl.resetDatabasePage>reset base de données</router-link>
                            </li>
                        </div>
                    </ul>
                </section>
                <section v-if="authenticated" class="nav__disconnect">
                    <Lougout/>
                </section>

            </div>            
        </nav>
    </div>
<router-view name="mobileNavBar"/>
</template>

<script>
import utils from '../../helper/utils';
import Lougout from '../button/LogoutButton.vue';
export default {    
    name: 'navbarMobile',
    components: {
        Lougout
    },
    emits: ['toggleNavbarMobile'],
    data(){
        return {
            baseUrl: utils.apiDataUrl            
        };
    },
    methods: {
        /**
         * masque la navbar mobile
         */
        toggleNavbarMobile() {
            this.$emit('toggleNavbarMobile', { display: false });
        }
    },
    computed: {
        authenticated() {
            return this.$store.getters.getUserIdent.userAuthenticated;
        },

        userRole(){
            return this.$store.getters.getUserIdent.roleId;
        },

        /**nombre de nouvelle notification */
        notificationCount(){
            return this.$store.getters.getNewNotification;
        }
    }
};
</script>

<style scoped>

    .nav__container{
        position: relative;
        background: rgba(167, 165, 165, 0.4);
        
    }

    .nav{
        width:80%;
        height: 100vh;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .nav__title-container{
        width: 100%;
        margin-top: 25px;
    }

    .title--size{
        font-weight: 900 !important;
        font-size: 1.8rem !important;
        color:var(--main_color) !important
    }

    .nav__item-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .nav__items{
        margin-top: 25px;
    }

    .nav__list-item{

        text-align: left;
    }

    .nav__navlink{
        margin: 15px 10px;
    }

    .nav__navlink-item{
        font-size: 0.8rem;
        font-weight: 700;
        color: black ;    
        text-decoration: none;
        text-transform: uppercase;
    }

    .nav__disconnect{
        width: 100%;
    }

    .nav__link-group{        
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .navlink__round{
        margin-left: 5px;
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
   /*#region button close*/
   
    .nav__close-button-container{
        position: absolute;
        right: 15px;
        width: 40px;
        height: 40px;
    }

    .nav__close-button{
        cursor: pointer;
            background: transparent;
            margin: 10px;
            border: none;
            color: black;
            width: 50%;
    }
    /*#endregion*/
</style>