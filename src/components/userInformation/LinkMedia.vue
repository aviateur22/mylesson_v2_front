<template>
 <!-- lien reseau linkedin -->
    <section class="information__title-container">
        <div class="information__main-container">
            <div class="information__icone-container">
                <!--image du media concerné -->
                <MediaIconeComponent :imageMedia="imageMedia"/>
            </div>
            <h2 class="information__title">votre {{data.compagny_name}}</h2>                                                                               
            </div>
    </section>
               
    <form ref=linkFormUrl class="form">            
        <div class="form__group">
            <div class="form__input-container">                   
                <label for=linkUrl class="form__label">votre lien {{data.compagny_name}}</label>         
                <div class="form__control">                            
                    <input class="form__input" type="text" placeholder="https://..." name=linkUrl v-model="urlLinkData.urlLink">
                </div>
            </div>
            <div class="form__button-container">
                <SubmitButton @click.prevent="saveLinkMedia()" :textSubmitButton='updateLinkMediaButtonText'/> 
                <SubmitButton @click.prevent="deleteLink()" :textSubmitButton='deleteLinkMediaButtonText'/> 
            </div>
        </div>
    </form> 
</template>

<script>
import SubmitButton from '../button/SubmitButton.vue';
import MediaIconeComponent from './MediaIcone.vue';
import utils from '../../helper/utils';
export default {
    name: 'mediaLink',
    components: {
        SubmitButton,
        MediaIconeComponent
    },
    props: ['data', 'token'],
    data(){
        return {
            /** image media reseau sicaiux */
            imageMedia: null,

            deleteLinkMediaButtonText: 'supprimer',
            updateLinkMediaButtonText: 'enregistrer',

            /** url utilisateur du média */
            urlLinkData: {}

        };
    },
    methods: {
        /** 
         * récuperation des images github et likedin
         */
        async getMediaImage(){
            /** gestion des image reseau sociaux */            
            const imageUrl = await this.$store.dispatch('actionHandler', { action: 'getLinkByName', mediaName: this.data.compagny_name});        

            if(!imageUrl){
                return null;
            }

            /** imahe reseau sociaux */
            this.imageMedia = utils.baseUri + imageUrl;
        },

        /**
         * récuperation du lien du média
         */
        getUserUrlMedia(){
            const userLinks = this.inputUserData.links;

            /** si au moin 1 links */
            if(userLinks?.length > 0){               
                const userLink = userLinks.find(link => link.id === this.data.id);

                /** ajout le lien urlLink, si le média est trouvé */
                if(userLink){
                    this.urlLinkData = {
                        urlLink: userLink.UserLink.link_url,
                        mediaLinkId: userLink.UserLink.link_id                      
                    };                  
                }                
            } else {
                /** reset de  urlLinkData */
                this.urlLinkData = {};
            }
        },

        /**
         * enregistrement ou mise a jour des liens github ou linkedin
         */
        async saveLinkMedia(){
            /** creation d'un formData */
            let formData = new FormData(this.$refs.linkFormUrl);

            formData.append('mediaId', this.data.id);

            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            formData.append('token', this.token.token);

            formData = Object.fromEntries(formData.entries());
            
            await this.$store.dispatch('actionHandler', { action: 'saveLinkMedia', formData, mediaName: this.data.compagny_name});

            /** mise urlLinkData */
            this.getUserUrlMedia();
        },
        
        /**
         * Suppression d'un lien média 
         */
        async deleteLink(){
            /** creation d'un formData */
            let formData = new FormData();       

            /** id du média  */
            const mediaLinkId = this.urlLinkData.mediaLinkId; 

            /** aucun lien de trouvé */
            if(!mediaLinkId){   
                return null;
            }

            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            formData.append('token', this.token.token);

            /** ajout du medialinkId */
            formData.append('mediaLinkId', mediaLinkId);

            formData = Object.fromEntries(formData.entries());     
            
            await this.$store.dispatch('actionHandler', { action: 'deleteLinkByUserId', formData, mediaName: this.data.compagny_name });

            /** mise urlLinkData */
            this.getUserUrlMedia();
        }
    },
    computed: {
        /** données utilisateur */
        inputUserData(){
            return this.$store.getters.getUserProfilData;
        }

    },
    async created(){       
        /** chargement des image des media */
        await this.getMediaImage();

        /** récuperation url enregistré en base de données */
        this.getUserUrlMedia();
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

    .information__main-container{
        padding: 5px;
        display: flex;
        align-items: center;

    }
    
    .information__icone-container{
        width: 80px;
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

    .form__input-container{
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