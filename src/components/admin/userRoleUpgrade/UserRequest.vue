<template>
    <div class="main__container">
        <article class="article">
            <header class="article__header">
                <!-- avatar de la personne -->
                <img class="article__header-image" :src=this.imageSrc alt="image de l'avatar">

                <!--login de la personne -->
                <p class="article__header-text">
                    {{data.login}}
                </p>                
        </header>
        <main class="article__main">        
            <SubmitButton @click="updateUserRole(true)" :textSubmitButton="'donner les droits d\'édition'"/>
            <SubmitButton @click="updateUserRole(false)" :textSubmitButton="'refuser la demande'"/>
        </main>
    </article>
  </div>
</template>

<script>
import SubmitButton from '../../button/SubmitButton.vue';
import utils from '../../../helper/utils';
export default {
    name: 'userRequest',
    components: {
        SubmitButton        
    },
    props: ['data', 'token', 'index'],
    data(){
        return {
            /** affiche de l'image avatar */
            imageSrc: utils.baseUri + utils.userApi.getAvatarByKey.endPoint.replace(':key', this.data.avatar)
        };
    },
    methods: {
        /**Mise a jour du role utilisateur */
        async updateUserRole(value){
            const formData = new FormData();

            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            formData.append('token', this.token.token);

            /**résulate de la requete */
            let resultRequest;
             
            /** ajout des droits utilisateurs */ 
            if(value === true){
                resultRequest = await this.$store.dispatch('actionHandler', { action: 'updateUserRole', userId: this.data.id, formData: Object.fromEntries(formData.entries()) });
            } else {
                /** demande upgrade refusée */ 
                resultRequest = await this.$store.dispatch('actionHandler', { action: 'removeUserPrivilegeByUserId', userId: this.data.id, formData: Object.fromEntries(formData.entries()) });
            }    
           
            if(!resultRequest){
                return null;
            }

            /** mise a jour de la liste utilisateurs en attente  */
            this.$emit('updateUserArray', this.index);
        }
    }
};
</script>

<style scoped>
.main__container{
    width: 100%;
    display: flex;
    align-items: column;
    justify-content: center;
    padding: 2em 0em;
}

    .article{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
        padding: 0.5em 1em;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }

    .article__header{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items:center;
    }

    .article__header-image{
        width: 4rem;
        height: 4rem;     
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    .article__header-text{
        text-transform: uppercase;
        padding-top: 5px;
    }

    .article__main{
        width: 100%;
    }

    @media screen and ( min-width: 1024px) {
        .article{        
            flex-direction: row;
        }
        .article__header{
            flex-direction: row;
        }

        .article__header-image{
           margin-right: 1em;
        }
        
    }

</style>