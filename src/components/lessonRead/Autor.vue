<template>
    <div class="autor__container">    
         <!-- conteneur image -->                  
        <div v-if="user != undefined" class="autor__image-container">
            <img class="autor__image" :src="imageSrc" alt="image du créateur de le leçon">
        </div>
        <!-- conteneur description -->
        <div class="autor__text-container">
            <!-- nom -->
            <div class="autor__name">

            </div>
            <!-- prénoms -->
            <div class="autor__first-name">

            </div>
            <!-- pseudo -->
            <div class="autor__login">
                <span class="autor__text"> par {{this.user.autor}}</span>
            </div>
        </div>       
    </div>  
</template>

<script>
import utils from '../../helper/utils';
export default {
    name: 'autor',
    data(){
        return {         
           
        };
    },
    methods: {        
    },
    computed: {
        /** donnée global leçon */
        user(){
            return this.$store.getters.getLessonEditor;
        },

        /** image de l'autor */
        imageSrc(){
            /** renvoie l'image uniquemenent quand les données sont présente */
            if(this.user.avatarKey){
                return utils.baseUri + utils.userApi.getAutorAvatarByKey.endPoint.replace(':key', this.user.avatarKey);
            } 
            return null;    
        }
    }
};
</script>

<style scoped>

    .autor__container{
        display: flex;
        align-items: center;       
        padding: 10px;
    }
    
    .autor__image{

        width: 40px;
        height: 40px;
        border: 0.5px solid rgb(97, 47, 93);
        border-radius: 50%;
        object-fit: cover;
    }

    .autor__text{
        text-transform: uppercase;
        font-size: var(--text_s);
        padding-right: 10px;
        color: white
    }

</style>