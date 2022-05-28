<template>
    <!-- titre de la partie -->
    <section class="information__title-container">
        <h2 class="information__title">Votre avatar</h2>
    </section>
      <!-- Profil utilisateur -->
    <form @submit.prevent="updateAvatar" class="form">               
        <!-- selection de l'avatar -->
        <div class="avatar__container">
            <div class="form__group-avatar">
                <label for="avatar" class="form__label">avatar</label>
                <div class="form__control">
                    <input style="display: none" @change="selectImage" class="form__input" type="file" name="image" ref="imageInput" accept="image">                        
                </div>                        
            </div>
            <!--Preview de l'image -->
            <div v-if="imageSrc" class="preview__avatar-container">             
                <img :src="imageSrc" class="preview__avatar"/>
            </div>
            <SubmitButton class="avatar__button"  @click.prevent="$refs.imageInput.click()" :textSubmitButton="textAvatarButton"/>
        </div>
        
        <div class="button__container">
            <SubmitButton :disableSubmitButton='disableAvatarSubmitButton' :textSubmitButton='updateAvatarSubmitButtonText'/> 
        </div>                   
    </form>   
</template>

<script>
import utils from '../../helper/utils';
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'simpleAvatar',
    components: {
        SubmitButton
    },
    data() {
        return {
            /** text boutton enregistrement avatar */
            updateAvatarSubmitButtonText: 'enregistrer',

            /** text bouton modifier mon avatar */
            textAvatarButton: 'modifier',            

            /** etat d'activation du bouton de soumission */
            disableAvatarSubmitButton: false,            
            
            /** object pour afficher la preview de l'avatar*/
            imageSrc: null
        };
    },
    methods: {  
        /**
         * update du profil
         */
        async updateAvatar(e) {            
            this.disableAvatarSubmitButton = true;  
           
            /** creation d'un formData - middlware multer dans le back cause upload file*/
            const formData = new FormData(e.target);       

            /** ajout du token */
            if(!this.$store.getters.getUserProfilData?.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            formData.append('token', this.$store.getters.getUserProfilData.token.token);
            formData.append('secret', this.$store.getters.getUserProfilData.token.secret);

            const updateProfilImage = await this.$store.dispatch('actionHandler', {action: 'updateImageByUserId', formData});

            this.disableAvatarSubmitButton = false;
        },  
        
        /**
         * récuperation de l'avatar de l'utilisateur
         */
        async getAvatarImage(key){
            /** récupere un text d'erreur si necessaire */
            const getAvatar = await utils.userApi.getAvatarByKey.endPoint.replace(':key', key);              
            
            /** si pas de resultat */
            if(!getAvatar){
                return null;
            }
            
            /** affiche de l'image avatar */
            this.imageSrc = utils.baseUri + utils.userApi.getAvatarByKey.endPoint.replace(':key', key);       
        },       

        /**
         * affichage avatar
         */
        selectImage(){            
            /** select file in input */            
            this.inputUserData.image = this.$refs.imageInput.files[0];
            this.imageSrc = URL.createObjectURL(this.inputUserData.image);
        },

    },   
    computed: {
        /** données utilisateur */
        inputUserData(){
            return this.$store.getters.getUserProfilData;
        }
    },    
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

    .avatar__container{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .form__group-avatar{
        width: 100%;   
        padding: 10px 0px;        
    }
    .preview__avatar-container{    
        width: 150px;
        height: 150px;
        
        position: relative;        
    }

    .preview__avatar{
        width: 150px;
        height: 150px;
        border: 1px solid var(--main_color); 
        border-radius: 50%;
        object-fit:cover;
        vertical-align: middle;      
    }

    .avatar__button{
        max-width: 200px
    }

</style>