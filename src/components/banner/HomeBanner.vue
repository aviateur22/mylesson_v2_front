<template>
<!-- banniere de presentation -->
<div class="banner__container">    
    <!-- couleur de la banniere -->
    <div class="banner__color">
        <div class="banner__inner-container">
            <div class="banner__image-container zoom">
                <img class="banner__image" src="../../assets/img/hand.png" alt="image d'une main avec le pouce en l'air">
            </div>      
            <div class="banner__text-container">
                <p class="banner__text left">des leçons et tutoriels basés</p>    
                <p class="banner__text right">sur nodejs et vuejs</p>
            </div>                  
            
        </div> 
    </div>                          
    <!-- text -->
                            
</div>  
</template>

<script>
export default {
    name: 'homeBanner',
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

    .left{
        animation: translateFromLeft 4s ease-in-out;
    }

    .right{
        animation: translateFromRight 4s ease-in-out;
    }

    .zoom{            
        animation: zoom 3s;
        animation-delay: 0s;        
    }

    /* affichage texte de la gauche */
    @keyframes translateFromLeft{
        0%{
            opacity: 0;     
            transform: translateX(-1500px);      
        }

        50%{
            opacity: 0;
            transform: translateX(-500px);
        }

        70%{
            opacity: 0;
            transform: translateX(-200px);
        }

        100%{
            opacity: 1;
            transform: translateX(0px);
        }
    }

    /* affichage text de la droite */
    @keyframes translateFromRight{
        0%{
            opacity: 0;     
            transform: translateX(1500px);      
        }

        50%{
            opacity: 0;
            transform: translateX(500px);
        }

        70%{
            opacity: 0;
            transform: translateX(200px);
        }

        100%{
            opacity: 1;
            transform: translateX(0px);
        }
    }
    /**affichage avec effer de grossiesement  */
    @keyframes zoom{
        0%{
            opacity: 0;     
            transform:scale(3.5);
        }

        50%{
            opacity: 1;     
            transform:scale(0.5);
        }

        100%{
            opacity: 1;
            transform:scale(1);
        }
    }

    .banner__image-container{
        width: 180px;
        height: 180px;      
        display: flex;
        align-items: center;
        justify-content: center;
        border: 5px solid white;
        border-radius: 50%;   
        padding: 10px;
    }

    .banner__image{  
        height: 130px;
    }

    @media screen and (min-width:768px) {
        
        .banner__inner-container{        
            flex-direction: row;
            justify-content: space-between;
        }  

        .banner__text-container{
            padding: 0px 35px;
        }

        .banner__text{
            font-size: var(--form_title_size);     
        }
    }

</style>