<template>
  <div class="container">
      <div class="form__container">
            <div class="form__title-container">
                <h2 class="form__title">Se connecter</h2>
            </div>
            <div class="form__container-control">          
                <form @submit.prevent="loginAction"  class="form">            
                    <div class="form__group">
                        <label for="email" class="form__label">email</label>
                        <div class="form__control">
                            <input class="form__input" type="email" placeholder="toto@hotmail.fr" name="email">
                        </div>
                    </div>
                    
                    <!-- mot de passe -->
                    <InputToggleButton :title="'mot de passe'" :placeHolder="'mot de passe'" :inputName="'password'"/>

                    <SubmitButton :disableLoginButton='disableLoginButton' :textSubmitButton='textSubmitButton'/>
                    <div class="nav__navlink form--color">
                        <router-link class="nav__navlink-item" :to="resetPasswordPageUrL">mot de passe perdu</router-link> 
                    </div>
            </form> 
      </div>      
    </div> 
  </div>
</template>

<script>
import SubmitButton from '../components/button/SubmitButton.vue';
import InputToggleButton from '../components/input/InputTextTogglrVisibility.vue';
import utils from '../helper/utils';
export default {
    components: {
        SubmitButton,
        InputToggleButton
    },
    data() {
        return {
            resetPasswordPageUrL: utils.apiDataUrl.passwordLostPage.url,
            textSubmitButton: 'se connecter',
            disableLoginButton: false,
            token: undefined
        };
    },
    methods: {
        /**
         * Recuperation données du Formulaire et Login Action du client
         */
        async loginAction(e) {    
            //désactivation du bouton
            this.disableLoginButton = true;

            const formData = new FormData(e.target);

            /** ajout du token */
            if(!this.token){
                this.disableLoginButton = false;
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            formData.append('token', this.token);                  

            await this.$store.dispatch('actionHandler', { action: 'loginAction', formData: Object.fromEntries(formData.entries()) });
            
            //réactivation du bouton
            this.disableLoginButton = false;
        },

        /** récupération d'un token visiteur */
        async getVisitorToken(){
            /**génération token  */
            const token = await this.$store.dispatch('actionHandler', {action: 'createTokenVisitor'});
            
            if(!token?.dataToken){
                return;
            }
            
            /** token */   
            this.token = token.dataToken.token;
        }
    },
    async created(){
        /**génération d'un token */
        await this.getVisitorToken();
    }
};
</script>

<style scoped>

    .container{    
        margin-top:var(--navbar_height) ;
        height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
    }

    .form__container{    
        display: flex;
        flex-direction: column;   
        width: 100%;     
        background: white;  
    }

    .form__title-container{        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form__title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
    }

    .form__container-control{
        display: flex;
        align-items: center;    
        width: 100%;       
    }

    .form{        
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .form__group{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding: 15px;
    }

    .form__control{
        width: 100%;
    }

    .form__label{
        text-transform: uppercase;
        font-size: 0.8rem;
        padding: 5px 0px;
        font-weight: 800;
    }

    .form__input{
        width: 100%;
        height: 45px;
        border:0.5px solid var(--main_color); 
        border-radius: 10px;
        padding-left: 5px;
        text-decoration: none;        
        outline: none;
    }

    .nav__navlink{
        text-align: left;
        padding: 10px;
    }

    .nav__navlink-item{    
        color: var(--main_color) ;    
        text-decoration: none;
        text-transform: uppercase;
        font-size: 0.7rem;
        font-weight: 600;
    }

    @media screen and (min-width:768px) {

        .form__container{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

    @media screen and (min-width:1024px) { 

    }
</style>