<template>
 <div class="container">
      <div class="form__container">
            <div class="form__title-container">
                <h2 class="form__title"> Transferer un fichier </h2>
            </div>
            <div class="form__container-control">          
                <form @submit.prevent="uploadAction"  class="form">            
                    <div class="form__group">
                        <label for="file" class="form__label">Votre fichier</label>
                        <div class="form__control">
                            <input class="form__input" type="file" placeholder="Selectionner votre fichier" name="file">
                        </div>
                    </div>
                <input class="button button--primary" type="submit" value="Enregister mon fichier">        
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
        margin-top:var(--navbar_height) ;
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

     .button--primary{
        background: var(--main_color);    
    }

     @media screen and (min-width:768px) {

        .form__container{        
            width: 768px;                        
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }

</style>