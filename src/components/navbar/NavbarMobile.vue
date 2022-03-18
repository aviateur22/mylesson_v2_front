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
                    <router-link @click="toggleNavbarMobile" class="nav__navlink-item title--size" to="/">My Lesson</router-link>
                </h1>
            </div>
            <section class="nav__items">
                <ul class="nav__list-item">
                    <li class="nav__navlink">
                        <router-link @click="toggleNavbarMobile" class="nav__navlink-item" to="/login">Connexion</router-link>
                    </li>
                    <li class="nav__navlink">
                        <router-link @click="toggleNavbarMobile" class="nav__navlink-item" to="/signup">inscription</router-link>
                    </li>
                </ul>
            </section>
        </nav>
    </div>
<router-view name="mobileNavBar"/>
</template>

<script>
export default {
    name: 'navbarMobile',
    emits: ['toggleNavbarMobile'],
    methods: {
        /**
         * masque la navbar mobile
         */
        toggleNavbarMobile() {
            this.$emit('toggleNavbarMobile', { display: false });
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

    .nav__title{
        
    }

    .title--size{
        font-weight: 900 !important;
        font-size: 1.8rem !important;
        color:var(--main_color) !important
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