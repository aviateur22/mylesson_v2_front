<template>
   <!-- changement de mot de passe -->
    <section class="information__title-container">
        <h2 class="information__title">modifier votre mot de passe</h2>
    </section>
    
    <form @submit.prevent="updateUserPassword" ref="informationForm" class="form">            
        <div class="form__group">
            <div class="form__input-container">
                <label for="password" class="form__label">ancien mot de passe</label>
                <div class="form__control">                            
                    <input class="form__input" type="password" placeholder="ancien mot de passe" name="password">
                </div>
            </div>
        </div>

        <div class="form__group">
            <div class="form__input-container"> 
                <label for="newPassword" class="form__label">nouveau mot de passe</label>
                <div class="form__control">
                    <input class="form__input" type="password" name="newPassword" placeholder="nouveau mot de passe">
                </div>
            </div>
        </div>

        <!-- selection du sex -->
        <div class="form__group-select">   
            <div class="form__input-container">                     
                <label for="confirmNewPassword" class="form__label">confirmation nouveau mot de passe</label>
                <div class="form__control">                            
                    <input class="form__input" type="password" placeholder="confirmation mot de passe" name="confirmNewPassword">
                </div>
            </div>
        </div> 
        
        <div class="form__button-container">
            <SubmitButton :disableSubmitButton='passwordSubmitButtonDisable' :textSubmitButton='passwordSubmitButtonText'/> 
        </div>                   
    </form>   
</template>

<script>
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'passwordChange',
    components: {
        SubmitButton
    },
    data(){
        return {

            /** text du boutton  */            
            passwordSubmitButtonText: 'modifier',

            /** etat d'activation du boutton de soumission */
            passwordSubmitButtonDisable: false,

            /** données dans l'input modifiable par l'utilisateur
             * @property userUpdatePassword.password
             * @property userUpdatePassword.newPassword
             * @property userUpdatePassword.confirmNewPassword
             */
        };
    },
    methods: {
        /**
         * Mise a jour du mot de passe
         */
        async updateUserPassword(e){
            /** creation d'un formData */                
            const formData = Object.fromEntries(new FormData(e.target).entries());  

            /** mise a jour du mot de passe*/
            await this.$store.dispatch('actionHandler', { action: 'updateUserPassword', formData});
        },
    }
};
</script>

<style scoped>
 .information__title-container{  
        padding-top: 20px;      
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .information__title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
    }

    .form{        
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-bottom: 0.1px solid gray;   
    }

    .form__group{
        padding: 10px 0px;        
    }

    .form__control{
        width: 100%;
    }

    .form__input-container{
        display: flex;
        flex-direction: column;
    }

    .form__label{
        text-transform: uppercase;
        font-size: 0.8rem;
        padding: 5px 0px;
        font-weight: 800;
        text-align: left;
    }

    .form__input{
        width: 100%;
        height: 45px;
        border:0.5px solid var(--main_color); 
        border-radius: 10px;
        padding-left: 5px;
    }

    .form__button-container{
        padding-top: 20px;
    }
</style>