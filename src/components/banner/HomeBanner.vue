<template>
<!-- banniere de presentation -->
<div class="banner__container">    
    <!-- couleur de la banniere -->
    <div class="banner__color">
        <div class="banner__inner-container">
            <div class="banner__image-container hide--image">
                <img class="banner__image" src="../../assets/img/hand.png" alt="image d'une main avec le pouce en l'air">
            </div>      
            <div class="banner__text-container">
                <p class="banner__text">des leçons et tutoriels pour nodejs et vuejs</p>    
            </div>                  
            
        </div> 
    </div>                          
    <!-- text -->
                            
</div>  
</template>

<script>
export default {
    name: 'homeBanner'    

};
</script>

<style scoped>
    .banner__container{
        position: relative;
        height: 300px;
        overflow: hidden;
    }

    .banner__color{
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        width: 100%;
        background: var(--main_color);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .banner__inner-container{       
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: inherit;
        padding: 25px;
        color: white;
        width: 100%;
    }

    .banner__text-container{
        padding: 20px 10px;
    }

    .banner__text{
        text-align: center;
        font-weight: 800;
        font-size: var(--text_button_size);
        text-transform: uppercase;
        line-height: 1.5;
        letter-spacing: 3px;
    }

    .banner__image-container{
        width: 150px;
    }

    .banner__image{
        width: 150px;
    }

    .hide--image{
        display: block;
    }

    @media screen and (min-width:768px) {
        
        .banner__inner-container{        
            flex-direction: row;
        }   

        .hide--image{
            display: block;
        }

        .banner__text-container{
            padding: 0px 35px;
        }

        .banner__text{
            font-size: var(--form_title_size);     
        }
    }

</style>