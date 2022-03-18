<template>
  <div class="container">
      <div class="button__container">     
            <div class="button__navlink">
                <router-link class="button__navlink-item" :to=data.link>   
                    <div class="nav__navlink-container">
                        <h3 class="button__title">{{ data.title }}</h3>
                        <img class="button__img" src='../../assets/img/css.png' alt="image de test ">                        
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
    props: ['data']
};
</script>

<style scoped>

    .container{
        margin: 25px 15px;
        background: var(--main_background_color);     
    }

    .button__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:250px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }

    .button__navlink-item{
        text-decoration: none;
    }

    .button__title{
        
        text-transform: uppercase;
        font-size: 0.9rem;
        font-weight: 600;
        color: rgb(94, 94, 94);
        padding: 10px 0px;
    }

    .button__section-img{
        display: flex;
        align-items: center;
        justify-content: center;       
    }
    
    .button__img{
        object-fit: cover;
    }

    @media screen and (min-width:560px) {
        .container{
            margin: 10px 10px;
            background: var(--main_background_color);
            width:calc( 50% - 20px);
        }

        .button__container{
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