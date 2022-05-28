<template>
    <div class="request__container">
        <article class="article">
            <header class="article__header">               
                <h2 class="article__header-title"> Utilisateurs souhaitant éditer du contenu </h2>                
            </header>            
            <main class="article__main">
                <section class="article__section" v-if="this.users.length>0">
                    <transition-group name="list">
                        <UserRequestComponent @updateUserArray=this.updateUserArray v-for="(user, i) in users" :key="user" :index="i" :data="user" :token="token"/>
                    </transition-group>
                </section>
                <section class="article__section" v-else>
                   <p> Aucun utilisateur en attente </p>
                </section>
                
            </main>
        </article>
    </div> 
  
</template>

<script>
import UserRequestComponent from '../../components/admin/userRoleUpgrade/UserRequest.vue';
export default {
    name: 'upgradeRoleRequest',
    components: {
        UserRequestComponent
    },
    data() {
        return {
            users: [],
            token: undefined
        };
    },
    methods: {
        /**récuperation des utilisateurs voulant éditer des lecon */
        async getAllUserRequest(){
            const userRequest = await this.$store.dispatch('actionHandler', { action: 'getUsersRequest' });
            this.users = userRequest.users;
        },
        
        /** 
         * Mise à jour de la liste utilisateur
         */
        updateUserArray(index){
            this.users.splice(index, 1);
        },

        /** recupération d'un token pour la soumission de la demande */
        async getToken(){
            /**génération token  */
            const token = await this.$store.dispatch('actionHandler', {action: 'createToken'});            

            if(!token?.dataToken){
                return;
            }
                       
            /** token */
            this.token = token.dataToken;                   
        }
    },

    created(){
        /** recupération de la liste des utilisateurs */
        this.getAllUserRequest();

        /** generation d'un token */
        this.getToken();
    }
};
</script>

<style scoped>
    .request__container{
        margin-top:var(--navbar_height) ;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;  
    }

   .article{
        display: flex;
        flex-direction: column;   
        width: 100%;     
        background: white;  
        min-height: calc( 100vh - var(--navbar_height));
        align-items: center;
        justify-content: space-between
   }

   .article__header{        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .article__header-title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
        padding:40px 0px
    }

    .article__main{
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .article__section{
        width: 100%;
    }

    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 1s;        
    }
    .list-enter,
    .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(30px);
    }

    .list-leave-active {
        position: absolute;

    }

    @media screen and (min-width:768px) {

        .article{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

    @media screen and (min-width:1024px) { 
        .article{
            width: 1024px;   
        }

    }
</style>