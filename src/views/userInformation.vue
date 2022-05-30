.<template>
    <div class="information__main-container">
        <div class="container">
            <!-- boutons de navigation -->
            <section class="information__form-container">                 
                <!-- form profile utilisateur-->
                <ProfileComponent :token="token"/>

                <!-- Role utilisateur -->
                <UserRoleComponent :token="token"/>

                <!-- form pour modification avatar -->
                <AvatarComponent ref="imageComponent" :token="token"/>            

                <!-- from pour changement du mot de passe -->
                <PasswordComponent :token="token"/>

                <!-- form pour link media -->                
                <LinkMediaComponent v-for="(link, i) in mediaLinks" :data="link" :key="i" :token="token"/>
            </section>
        </div> 
    </div>  
</template>

<script>
import ProfileComponent from '../components/userInformation/Profile.vue';
import AvatarComponent from '../components/userInformation/SimpleAvatar.vue';
import PasswordComponent from '../components/userInformation/PasswordChange.vue';
import LinkMediaComponent from '../components/userInformation/LinkMedia.vue';
import UserRoleComponent from '../components/userInformation/UserRole.vue';
export default {
    components: {
        ProfileComponent,
        AvatarComponent,
        PasswordComponent,
        LinkMediaComponent,
        UserRoleComponent

    },
    data() {
        return {
            /** info utilisateur */
            user: {},

            /** links */
            mediaLinks: [],

            /**token */
            token: undefined
        };
    },
    methods: {
        /**
         * récuperation d'un token pour le formulaire
         */
        async getToken(){
            /**génération token  */
            const token = await this.$store.dispatch('actionHandler', {action: 'createToken'});            

            if(!token?.dataToken){
                return;
            }

            /** enregistre le token */
            this.token = token.dataToken;
        },

        /**
        * récupération des infos utilisateur
        */
        async getUserInformation(){            
            /** récuperation info utilisateur*/
            const userInformation = await this.$store.dispatch('actionHandler', { action: 'getUserInformation'});

            /** pas d'information utilisateur*/
            if(!userInformation){
                return;
            }
            /** parametre user */
            this.user = userInformation;            

            this.getImageUser();
        },
      
        /** recuperation de tous les média disponible */
        async getAllLinkMedia(){
            /** uniquement pour les utilisateur ayant au moin un niveau writer */
            const userRoleId = this.$store.getters.getUserIdent.roleId;
         
            if(userRoleId < 2){
                return;
            }

            /** récuperation info utilisateur*/
            const getLinks = await this.$store.dispatch('actionHandler', { action: 'getAllLink'});

            /** pas d'information utilisateur*/
            if(!getLinks){
                return;
            }

            /** parametre user */
            this.mediaLinks = getLinks;
        },

        /**
         * récuperation de l'image utilisateur
         */
        async getImageUser(){
            this.$refs.imageComponent.getAvatarImage(this.user.avatarKey);
        }
    },
    async created(){
        /**token pour formulaire */
        await this.getToken();

        /** recuperation des infos utilsateur */
        await this.getUserInformation();
       
        /** recuperation des medias */
        await this.getAllLinkMedia();
    },
    beforeRouteLeave(to, from, next){
        /** reset des données des informations utilisateurs */
        this.$store.commit('setUserProfilData', {});
        next();
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