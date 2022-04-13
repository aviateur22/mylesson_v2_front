<template>
    <div class="form__group">
        <label :for="inputName" class="form__label">{{title}}</label>
        <div class="form__control">
            <input class="form__input" :type="inputTypePassword" :name="inputName" :placeholder="placeHolder">
            <button class="form__button-toggle" @click.prevent="togglePasswordVisibility">
                <img class="form__image" src='../../assets/img/eye.png' alt="image d'un oeil">
            </button>
        </div>
    </div>  
</template>

<script>

export default {
    name: 'inputtoggle',
    data(){
        return {
            /** input type password */
            inputTypePassword: 'password'
        };
    },
    props: ['inputName', 'placeHolder', 'title'],
    methods: {
        /**
         * modification visibilité du mot de passe
         */
        togglePasswordVisibility(){
            this.inputTypePassword = this.inputTypePassword === 'password' ? 'text' : 'password';
        }
    }
};
</script>

<style scoped>
    .form__group{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding: 15px;
    }

    .form__control{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        margin-right: 5px;
        outline: none;
    }

    .form__button-toggle{
        right: 0px;
        top: 0px;
        width: 40px;
        height: 40px;
        border: 0.5px solid gray;
        border-radius: 10px;
        cursor: pointer;
        transition: all var(--transition_standard);
    }

    .form__image{
        width: 70%;
    }

    .form__button-toggle:hover{
        border: 1px solid black;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

</style>