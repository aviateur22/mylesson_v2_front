<template>
    <!-- titre de la partie -->
    <section class="information__title-container">
        <h2 class="information__title">Votre Profile</h2>
    </section>
    <!-- Profil utilisateur -->
    <form @submit.prevent="updateUserProfil" class="form">            
        <div class="form__group">
            <div class="form__input-container">
                <label for="email" class="form__label">email</label>
                <div class="form__control">                            
                    <input class="form__input" type="text" placeholder="toto@hotmail.fr" name="email" v-model="inputUserData.email">
                </div>
            </div>
        </div>

        <div class="form__group">
            <div class="form__input-container">
                <label for="login" class="form__label">login</label>
                <div class="form__control">
                    <input class="form__input" type="text" name="login" placeholder="toto" v-model="inputUserData.login">
                </div>
            </div>
        </div>

        <!-- selection du sex -->
        <div class="form__group-select">
            <div class="form__input-container">
                <label for="sex" class="form__label">Votre sex</label>
                <select class="form__input" name="sex" v-model="inputUserData.sex">
                    <option selected disabled value="">Choisissez votre sex</option>
                    <option name="sex">homme</option>
                    <option name="sex">femme</option>
                </select>
            </div>
        </div>
        <div class="form__button-container">
            <SubmitButton :disableSubmitButton='profilSubmitButtonDisable' :textSubmitButton='profilSubmitButtonText'/> 
        </div>                             
    </form>   
</template>

<script>
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'profile',
    components: {
        SubmitButton
    },
    props: ['token'],
    data() {
        return {
            /** text bouton valider */
            profilSubmitButtonText: 'enregistrer', 

            /** desactivation du bouton valider */
            profilSubmitButtonDisable: false,
        };
    },
    methods: {
        /**
         * update du profil
         */
        async updateUserProfil(e) {    
            console.log(this.token)        
            this.disableSubmitButton = true;  

            /** formdata pour le formulaire */
            const data = new FormData(e.target);

            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            data.append('token', this.token.token);

            /** creation d'un formData - middlware multer dans le back cause upload file*/
            const formData = Object.fromEntries(data.entries()); 
             
            await this.$store.dispatch('actionHandler', {action: 'updateUserInformation', formData});

            this.disableSubmitButton = false;
        }
    },
    computed: {
        /** données utilisateur */
        inputUserData(){
            return this.$store.getters.getUserProfilData;
        }
    },
    watch: {
        /**vérification du sex de l'utilisateur */
        inputUserData: function(newValue, oldValue){            
            this.inputUserData.sex = this.inputUserData.sex ? this.inputUserData.sex : '';
        }
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