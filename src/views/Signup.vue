<template>
  <div class="container">
      <div class="form__container">
            <div class="form__title-container">
                <h2 class="form__title">S'inscrire</h2>
            </div>
            <div class="form__container-control">          
                <form @submit.prevent="signupAction" class="form">            
                    <div class="form__group">
                        <label for="login" class="form__label">login</label>
                        <div class="form__control">
                            <input class="form__input" type="text" placeholder="login" name="login">
                        </div>
                    </div>
                    <div class="form__group">
                        <label for="email" class="form__label">email</label>
                        <div class="form__control">
                            <input class="form__input" type="text" placeholder="email" name="email">
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="password" class="form__label">Mot de passe</label>
                        <div class="form__control">
                            <input class="form__input" type="password" name="password" placeholder="mot de passe">
                        </div>
                    </div>
                <SubmitButton :disableLoginButton='disableLoginButton' :textSubmitButton='textSubmitButton'/>
            </form> 
      </div>
    </div> 
  </div>
</template>

<script>
import SubmitButton from '../components/button/SubmitButton.vue';
import utils from '../helper/utils';
import {mapActions, mapMutations, mapGetters} from 'vuex';
export default {
    components: {
        SubmitButton
    },
    data() {
        return {
            textSubmitButton: "s'inscrire",
            disableLoginButton: false
        };
    },
    methods: {
        /**
         * inscription
         */
        async signupAction(e) {
            this.disableLoginButton = true;
            /** creation d'un formData */                
            const formData = Object.fromEntries(new FormData(e.target).entries());
            await this.$store.dispatch('actionHandler', { action: 'signupAction', formData });
            this.disableLoginButton = false;         
        }      
    } 

};
</script>

<style scoped>

    .container{  
        margin-top: var(--navbar_height);  
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