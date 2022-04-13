<template>
  <div  v-if="userRole >= data.userRole" class="navbutton__main-container">
      <div class="navbutton__container">     
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
export default {
    name: 'NavButton',
    props: ['data'],
    methods: {
        /** Renvoi l'url de l'image */
        getImg(){
            if(this.data.imageName){
                return require('../../assets/img/' + this.data.imageName);
            }           
            return null;
        }
    },
    computed: {
        userRole(){
            return this.$store.getters.getUserIdent.roleId;
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