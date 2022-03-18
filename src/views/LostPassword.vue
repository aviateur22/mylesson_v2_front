<template>
  <div class="container">
        <div class="form__container">
            <div class="form__text-container">
                <div class="form__title-container">
                    <h2 class="form__title">Mot de passe perdu</h2>
                </div>
                <div class="form__comment-container">
                    <h3 class="form__comment">Un lien te sera envoyé par mail pour renouveller ton mot de passe </h3>
                </div>
            </div>
            <div class="form__container-control">          
                <form class="form">            
                    <div class="form__group">
                        <label for="email" class="form__label">ton email</label>
                        <div class="form__control">
                            <input class="form__input" type="text" placeholder="email" name="email">
                        </div>
                    </div>
                    <input class="button button--primary" type="submit" value="Confirmer">
                    
                </form> 
            </div>      
    </div> 
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>

    .container{    
        height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;   
    }

    .form__container{    
        display: flex;
        flex-direction: column;   
        width: 100%;       
        background: white;
    }

    .form__title-container{        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form__title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
        color:var(--secondary_color)
    }

    .form__comment{
        font-size: 0.9rem;
        color: var(--secondary_color_small);
        padding: 20px 5px;

    }

    .form__container-control{
        display: flex;
        align-items: center;    
        width: 100%;       
    }

    .form{        
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .form__group{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding: 15px;
    }

    .form__control{
        width: 100%;
    }

    .form__label{
        text-transform: uppercase;
        font-size: 0.8rem;
        padding: 5px 0px;
        font-weight: 800;
    }

    .form__input{
        width: 100%;
        height: 45px;
        border:0.5px solid var(--main_color); 
        border-radius: 10px;
        padding-left: 5px;
    }

    .button{
        border:.5px solid var(--main_color); 
        border-radius: 10px;
        color: white;
        text-transform: uppercase;
        background: transparent;
        margin: 20px 0px;
        padding: 20px 0px;
        font-weight: 800;
    }

    .nav__navlink{
        text-align: left;
        padding: 10px;
    }

    .nav__navlink-item{    
        color: var(--main_color) ;    
        text-decoration: none;
        text-transform: uppercase;
        font-size: 0.7rem;
        font-weight: 600;
    }

    .button--primary{
        background: var(--main_color);    
    }
    @media screen and (min-width:768px) {

        .form__container{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

    @media screen and (min-width:1024px) {
    }
</style>