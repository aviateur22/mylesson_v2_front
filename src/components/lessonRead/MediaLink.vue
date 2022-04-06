<template>
<!-- image du média -->
    <div class="link__container">
            <div class="link__media">
                <a :href="userLink" target="_blank">
                    <img class="link__image" :src="imageMedia" alt="lien de renvoie vers une site externe, representé par une image"/>
                </a>
            </div>
    </div>
</template>

<script>
import utils from '../../helper/utils';
export default {
    name: 'mediaLink',
    props: ['data'],
    data(){
        return {
            imageMedia: null,
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
        }
    },
    computed: {        
        /** image du site */
        imageSrc(){
            return this.data.picture_name;
        },

        /** url du site  */
        userLink(){
            return this.data.UserLink.link_url;
        }
    },
    async created(){
        await this.getMediaImage();
    }
};
</script>

<style scoped>
    .link__container{
        padding: 10px;
        display: flex;

    }

    .link__image{
        width: 40px;
        height: 40px;
        border: 0.5px solid rgb(97, 47, 93);
        border-radius: 50%;
        object-fit: cover;
        background: white;
    }

</style>