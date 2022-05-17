<template>
  <div class="container">
      <div class="form__container">
            <div class="form__title-container">
                <h2 class="form__title">réinitialisation du mot de passe</h2>
            </div>
            <div class="form__container-control">          
                <form @submit.prevent="resetPassword"  class="form">
                    <!-- mot de passe -->
                    <InputToggleButton :title="'nouveau mot de passe'" :placeHolder="'mot de passe'" :inputName="'password'"/>

                    <!-- confirmation du mot de passe -->
                    <InputToggleButton :title="'confirmation du mot de passe'" :placeHolder="'mot de passe'" :inputName="'confirmPassword'"/>

                    <!-- reste mot de passe -->
                    <SubmitButton :disableLoginButton='disableLoginButton' :textSubmitButton="'modifier mot de passe'"/>                    
            </form> 
      </div>      
    </div> 
  </div>
</template>

<script>
import SubmitButton from '../components/button/SubmitButton.vue';
import InputToggleButton from '../components/input/InputTextTogglrVisibility.vue';
export default {
    components: {
        SubmitButton,
        InputToggleButton
    },
    data() {
        return {
            disableLoginButton: false,
            
            /**token requte */
            formToken: undefined
        };
    },
    methods: {        
        async resetPassword(e){
            this.disableLoginButton = true;

            /**token DE L'url */
            const token = this.$route.params.token;

            /**id utilisateur chiffré*/
            const userId = this.$route.params.userId;

            /**code reset */
            const reset = this.$route.params.reset;

            const formData = new FormData(e.target);

            formData.append('token', token); 
            
            formData.append('midToken', reset); 

            formData.append('userId', userId);
            
            /**reset mot de passe */
            const resetPassword = await this.$store.dispatch('actionHandler', { action: 'resetPasswordByUserId', formData: Object.fromEntries(formData.entries())});

            this.disableLoginButton = false;
        }
    },
    async created(){
        /**masque le loader */
        this.$store.commit('setLoaderState', false);
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