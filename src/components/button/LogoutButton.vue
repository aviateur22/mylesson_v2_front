<template>
    <div class="main__container">
        <div class="container">
            <section class="title__section">
                <h3> envie de vous deconnecter? </h3>
            </section>
            <section class="button__container-section">
                <SubmitButton :disableLoginButton='disableLoginButton' :textSubmitButton='textSubmitButton' @click="logoutAction"/>                
            </section>
        </div>
    </div>
</template>

<script>
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'Lougout',
    components: {
        SubmitButton
    },
    data(){
        return {
            disableLoginButton: false,
            textSubmitButton: 'se deconnecter'
        };
    },
    methods: {
        /*
         * Deconnexion du client
         */
        async logoutAction() {   
            //désactivation du bouton
            this.disableLoginButton = true;
            this.$store.dispatch('logoutAction', this.$router);
            this.disableLoginButton = false;
        },
    }
};
</script>

<style scoped>
    .main__container{
        width:100%
    }

    .container{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .button__container-section{
       width:100%;
       padding:0px 20px
    }

    .title__section{
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 900;
        padding: 40px 0px 10px 0px;
    }

    .button__logout{
        width: 90%;
        border:.5px solid var(--main_color); 
        text-decoration: none;
        border-radius: 10px;
        color: white;
        text-transform: uppercase;
        background: transparent;        
        padding: 20px 0px;
        margin-bottom: 10px;
        font-weight: 800;
        background: var(--main_color);        
    }

   @media screen and (min-width:768px) {

        .button__container-section{        
            width: 768px;                                    
        }
    }
</style>