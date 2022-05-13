<template>
  <div  v-if="userRole >= data.userRole" class="navbutton__main-container" >
      <div class="navbutton__container" :class="{flash: actif}">     
            <div class="button__navlink">
                <router-link class="navbutton__link" :to=data.link>   
                    <div class="navbutton__data-container">                        
                        <h3 class="button__title">{{ data.title }}</h3>
                        <div class="navbutton__image-container">
                            <img class="navbutton__image" :src="this.getImg()" alt="image représentant la catégorie du bouton">
                        </div>                        
                    </div>
                </router-link> 
            </div>                 
      </div>
  </div>
  <router-view :name="data.link"/>
</template>

<script>
import utils from '../../helper/utils';
export default {
    name: 'NavButton',
    props: ['data'],
    data(){
        return {
            actif: false
        };
    },
    methods: {
        /** Renvoi l'url de l'image */
        getImg(){
            if(this.data.imageName){
                return require('../../assets/img/' + this.data.imageName);
            }           
            return null;
        },

        /** récuperation des utilisateurs voulant éditer des lecon */
        async getAllUserRequest(){
            /** données de la requete */
            const endPoint = utils.adminApi.upgradeRequestCount.endPoint;
            const method = utils.adminApi.upgradeRequestCount.method;

            const data = await this.$store.dispatch('actionHandler', {action: 'countData', endPoint, method});
           
            /** mise en action  */
            if(data > 0){
                this.actif = true;
            }
        },

        /** récuperation des contenu abusif */
        async getAllAbusiveContent(){
            /** données de la requete */
            const endPoint = utils.adminApi.abusiveContentCount.endPoint;
            const method = utils.adminApi.abusiveContentCount.method;

            const data = await this.$store.dispatch('actionHandler', {action: 'countData', endPoint, method});
            
            /** mise en action  */
            if(data > 0){
                this.actif = true;
            }
        }
    },
    computed: {
        userRole(){
            return this.$store.getters.getUserIdent.roleId;
        }
    },
    created(){
        /**vérification contenu des lessons et utilisateur */
        if(this.data.checkData && this.userRole >= this.data.userRole){
            switch (this.data.checkData){
            case 'upgradeUserPrivilege': this.getAllUserRequest(); break;
            case 'lessonAbusiveContent':this.getAllAbusiveContent(); break;
            default :break;
            }
        }        
    }
};
</script>

<style scoped>

    .navbutton__main-container{
        margin: 25px 15px;
        background: var(--main_background_color);     
    }

    .navbutton__container{
        width:250px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        padding: 10px;
    }

    .navbutton__link{
        text-decoration: none;
    }

    .navbutton__data-container{
        height: 200px;
        overflow: hidden;
        display: flex; 
        flex-direction: column;    
    }

    .button__title{        
        text-transform: uppercase;
        font-size: 0.9rem;
        font-weight: 600;
        color: rgb(94, 94, 94);
        padding-bottom: 20px;
        flex-grow: 1;
    }

    .navbutton__image-container{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;        
    }
    
    .navbutton__image{  
        width: 100px;
        object-fit: scale-down;
    }

    .flash{
        animation: flashingButton 3s infinite linear;        
    }

    @keyframes flashingButton {
        0% { background: #c2c2c2; border: 2px solid #c2c2c2; }
        25% { background: #eeeeee; border: 2px solid #eeeeee; }
        50% { background: #f4faf9; border: 2px solid #f4faf9; }
        75% { background: #dbdbdb; border: 2px solid #dbdbdb; }
        100% { background: #c2c2c2; border: 2px solid #c2c2c2; }
    }

    @media screen and (min-width:560px) {
        .navbutton__main-container{
            margin: 10px 10px;
            background: var(--main_background_color);
            width:calc( 50% - 20px);
        }

        .navbutton__container{
            display: flex;
            flex-direction: column;
            align-items:stretch;
            justify-content: center;            
            border-radius: 5px;
            width: 100%;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }
              
    }

</style>