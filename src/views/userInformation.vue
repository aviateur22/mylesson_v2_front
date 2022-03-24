.<template>
    <div class="information__main-container">
        <div class="container">
            <!-- titre de la page -->
            <section class="information__title-container">
                <h2 class="information__title">données de votre compte</h2>
            </section>
            <!-- boutons de navigation -->
            <section class="information__form-container">    
                      
                <form ref="informationForm" class="form">            
                    <div class="form__group">
                        <label for="email" class="form__label">email</label>
                        <div class="form__control">                            
                            <input :disabled='!inputEnable' class="form__input" type="text" placeholder="toto@hotmail.fr" name="email" v-model="inputUserData.email">
                        </div>
                    </div>

                    <div class="form__group">
                        <label for="login" class="form__label">login</label>
                        <div class="form__control">
                            <input :disabled='!inputEnable' class="form__input" type="text" name="login" placeholder="toto" v-model="inputUserData.login">
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
                                <input style="display: none" @change="selectImage" :disabled='!inputEnable' class="form__input" type="file" name="image" ref="imageInput" accept="image">                        
                            </div>                        
                        </div>
                        <!--Preview de l'image -->
                        <div v-if="image" class="preview__avatar-container">             
                            <img :src="image" class="preview__avatar"/>
                        </div>
                        <SubmitButton class="avatar__button"  :disableSubmitButton='inputEnable' @click.prevent="$refs.imageInput.click()" :textSubmitButton="textAvatarButton"/>
                    </div>                   
                </form>                          
            </section>      
            <section class="information__button-container">
                <transition name="fade">
                    <div v-if="inputEnable" class="button__container">                    
                        <SubmitButton :textSubmitButton='textCancelButton'  @click="cancelAction"/>
                    </div>
                </transition>

                <div class="button__container">
                    <SubmitButton :disableSubmitButton='disableSubmitButton' :textSubmitButton='textSubmitButton' @click="updateAction"/> 
                </div>
            </section>     
        </div> 
    </div>  
</template>

<script>
import SubmitButton from '../components/button/SubmitButton.vue';
import axios from 'axios';
import utils from '../helper/utils';
export default {
    components: {
        SubmitButton
    },
    data() {
        return {
            /** text bouton valider */
            textSubmitButton: 'modifier',
            /** text bouton annuler */
            textCancelButton: 'annuler',
            /** text bouton avatar */
            textAvatarButton: 'changer mon avatar',
            /** active ou desactive les inputs */
            inputEnable: false,
            /** desactivation du bouton valider */
            disableSubmitButton: false,
            /**données en provenace de la bdd */
            userDataEmail: '',
            userDataLogin: '',  
            userDataSex: '',
            userDataImage: '',
            /** données dans l'input modifiable par l'utilisateur
             * @property inputUserData.email
             * @property inputUserData.login
             * @property inputUserData.sex
             * @property inputUserData.image
             */
            inputUserData: {},  
            selectedSex: '',
            /** object pour afficher la preview de l'avatar*/
            image: null,
        };
    },
    methods: {
        /**
         * clic sur le biuton valider
         */
        async updateAction() {
            /** enable input form */
            if(this.textSubmitButton === 'modifier'){
                /** Activation des inputs */
                this.inputEnable = !this.inputEnable;
                this.textSubmitButton = 'enregistrer';
            } else if(this.textSubmitButton === 'enregistrer'){
                /** validation des modification */
                this.updateUserInformation();
                /** désactivation des inputs */
                this.inputEnable = !this.inputEnable;
                this.textSubmitButton = 'modifier'; 
            } else {
                /** désactivation des inputs */
                this.inputEnable = !this.inputEnable;
                this.textSubmitButton = 'modifier';                
            }
        },

        /**
         * clic sur le bouton annuler
         */
        cancelAction() {            
            this.textSubmitButton = 'modifier';
            /** réinitilalise les données */
            this.inputUserData.email = this.userDataEmail; 
            this.inputUserData.login = this.userDataLogin;
            this.inputUserData.sex = this.userDataSex;
            /** désactivation des inputs */
            this.inputEnable = !this.inputEnable; 
        },

        /**
         * mise a jour des info utilisateir
         */
        async updateUserInformation(){
            this.disableSubmitButton = true;               
            /** creation d'un formData */
            const formData = new FormData(this.$refs.informationForm);            

            const request = await this.$store.dispatch('actionHandler', {action: 'updateUserInformation', formData});

            console.log(request);

            this.disableSubmitButton = false;
        },

        /**
        * récupération des infos utilisateur
        */
        async getUserInformation(){
            /** */
            const downloadData = await this.$store.dispatch('actionHandler', { action: 'getUserInformation'});
            
            /** données modifiable si update */
            this.userDataEmail = downloadData.email;
            this.userDataLogin = downloadData.login;

            /** données modifiable par les input */
            this.inputUserData = downloadData;
            this.inputUserData.sex = '';
        },

        /**
         * affichage de la preview
         */
        selectImage(){            
            /** select file in input */            
            this.inputUserData.image = this.$refs.imageInput.files[0];
            this.image = URL.createObjectURL(this.inputUserData.image);
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
        align-items: center;    
        width: 100%;     
        max-width: 500px;
    }

    .form{        
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
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
        height: 250px;
        position: relative;
    }

    .preview__avatar{
        width: 150px;
        height: 250px;
        object-fit:contain;
    }

    .avatar__button{
        max-width: 200px
    }
    .information__button-container{
        border-top: 0.1px solid gray;   
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1em 1em;
        max-width: 500px;
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

</style>