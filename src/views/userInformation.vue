.<template>
    <div class="information__main-container">
        <div class="container">
            <!-- titre de la page -->
            <section class="information__title-container">
                <h2 class="information__title">Votre Profil</h2>
            </section>
            <!-- boutons de navigation -->
            <section class="information__form-container">    
                <!-- Profil utilisateur -->
                <form @submit.prevent="updateUserProfil" class="form">            
                    <div class="form__group">
                        <label for="email" class="form__label">email</label>
                        <div class="form__control">                            
                            <input class="form__input" type="text" placeholder="toto@hotmail.fr" name="email" v-model="inputUserData.email">
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="login" class="form__label">login</label>
                        <div class="form__control">
                            <input class="form__input" type="text" name="login" placeholder="toto" v-model="inputUserData.login">
                        </div>
                    </div>

                    <!-- selection du sex -->
                    <div class="form__group-select">
                        <label for="sex" class="form__label">Votre sex</label>
                        <select class="form__input" name="sex" v-model="inputUserData.sex">
                            <option selected disabled value="">Choisissez votre sex</option>
                            <option name="sex">homme</option>
                            <option name="sex">femme</option>
                        </select>
                    </div>                   

                    <!-- selection de l'avatar -->
                    <div class="avatar__container">
                        <div class="form__group-avatar">
                            <label for="avatar" class="form__label">votre avatar</label>
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
                        <SubmitButton :disableSubmitButton='profilSubmitButtonDisable' :textSubmitButton='profilSubmitButtonText'/> 
                    </div>                   
                </form>   
                <section class="information__title-container">
                    <h2 class="information__title">Votre mot de passe</h2>
                </section>

                <!-- changement de mot de passe -->
                <form @submit.prevent="updateUserPassword" ref="informationForm" class="form">            
                    <div class="form__group">
                        <label for="password" class="form__label">ancien mot de passe</label>
                        <div class="form__control">                            
                            <input class="form__input" type="password" placeholder="ancien mot de passe" name="password" v-model="userUpdatePassword.password">
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="newPassword" class="form__label">nouveau mot de passe</label>
                        <div class="form__control">
                            <input class="form__input" type="password" name="newPassword" placeholder="nouveau mot de passe" v-model="userUpdatePassword.newPassword">
                        </div>
                    </div>

                    <!-- selection du sex -->
                    <div class="form__group-select">                        
                        <label for="confirmNewPassword" class="form__label">confirmation nouveau mot de passe</label>
                        <div class="form__control">                            
                            <input class="form__input" type="password" placeholder="confirmation mot de passe" name="confirmNewPassword" v-model="userUpdatePassword.confirmNewPassword" @keydown="valueUpdate">
                        </div>
                    </div> 
                    
                    <div class="button__container">
                        <SubmitButton :disableSubmitButton='passwordSubmitButtonDisable' :textSubmitButton='passwordSubmitButtonText'/> 
                    </div>                   
                </form>                        
            </section>      
            <section class="information__button-container">                

            </section>     
        </div> 
    </div>  
</template>

<script>
import SubmitButton from '../components/button/SubmitButton.vue';
import utils from '../helper/utils';
export default {
    components: {
        SubmitButton
    },
    data() {
        return {
            /** text bouton valider */
            profilSubmitButtonText: 'enregistrer',
            passwordSubmitButtonText: 'modifier',
            
            /** text bouton avatar */
            textAvatarButton: 'changer mon avatar',            

            /** desactivation du bouton valider */
            profilSubmitButtonDisable: false,
            passwordSubmitButtonDisable: false,

            /**données en provenace de la bdd pour le profil */
            userData: {},

            /** object pour afficher la preview de l'avatar*/
            imageSrc: null,

            /**boolean pour détection de modification */
            dataValueChange: false,
            passwordValueChange: false,

            /** données dans l'input modifiable par l'utilisateur
             * @property inputUserData.email
             * @property inputUserData.login
             * @property inputUserData.sex
             * @property inputUserData.image
             */
            inputUserData: {}, 
            
            /** données dans l'input modifiable par l'utilisateur
             * @property userUpdatePassword.password
             * @property userUpdatePassword.newPassword
             * @property userUpdatePassword.confirmNewPassword
             */
            userUpdatePassword: {},
            
        };
    },
    methods: {    
        /**
         * update du profil
         */
        async updateUserProfil(e) {            
            this.disableSubmitButton = true;  

            /** creation d'un formData - middlware multer dans le back cause upload file*/
            const formData = new FormData(e.target);            

            const request = await this.$store.dispatch('actionHandler', {action: 'updateUserInformation', formData});

            this.disableSubmitButton = false;
        },
       
        /**
        * récupération des infos utilisateur
        */
        async getUserInformation(){
            console.log('userData');
            /** récuperation info utilisateur*/
            const getUserData = await this.$store.dispatch('actionHandler', { action: 'getUserInformation'});           

            //modification des données pour le sex
            this.inputUserData.sex = getUserData.sex ? getUserData.sex : '';

            /** initilisation des models modifiable par l'utilisateur */
            this.inputUserData = getUserData;
            
            if(getUserData.avatarKey){
                /** récupere un text d'erreur si necessaire */
                await this.$store.dispatch('actionHandler', { action: 'getAvatarByKey', key: getUserData.avatarKey});                
                /** affiche de l'image avatar */
                this.imageSrc = utils.baseUri + utils.userApi.getAvatarByKey.endPoint.replace(':key', getUserData.avatarKey);                
            }
        },

        /**
         * affichage de la preview
         */
        selectImage(){            
            /** select file in input */            
            this.inputUserData.image = this.$refs.imageInput.files[0];
            this.imageSrc = URL.createObjectURL(this.inputUserData.image);
        },

        /**
         * Mise a jour du mot de passe
         */
        async updateUserPassword(e){
            /** creation d'un formData */                
            const formData = Object.fromEntries(new FormData(e.target).entries());  

            /** */
            const updatePassword = await this.$store.dispatch('actionHandler', { action: 'updateUserPassword', formData});
        }
    },
    created(){
        this.getUserInformation();
    }
};
</script>

<style scoped>
    .information__main-container{
        margin-top:var(--navbar_height) ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;   
        width: 100%;     
        background: white;  
    }   

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

     .information__form-container{
        display: flex;
        flex-direction: column;
        align-items: center;    
        width: 100%;     
        max-width: 500px;
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

    .form__group-select{
        padding: 10px 0px;
        display: flex;
        flex-direction: column;
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

    .button__container{            
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity var(--transition_time_opacity);
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }    

    @media screen and (min-width:768px) {

    }

    @media screen and (min-width:768px) {
       
        .container{        
            width: 768px;            
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .information__button-container{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .button__container{       
            margin: 0px 0.5em;
        }

    }

    @media screen and (min-width:1024px) {
       
        .container{        
            width: 1024px;                 
        }

    }

</style>