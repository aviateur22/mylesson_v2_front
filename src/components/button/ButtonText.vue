<template>
    <div class="button__container-text">
        <button class="button__text" type="submit">{{text}}</button>
    </div>
</template>

<script>
export default {
    name: 'buttonText',
    props: ['text']
};
</script>

<style scoped>
    .button__container-text{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

    }

    .button__text{
        background: transparent;
        border: none;
        text-decoration: none;
        color: white;
        cursor: pointer;
        padding: 5px 0px;
        font-size: var(--text_button_size);
        text-align: left;
    }

    .button__text:hover{
        text-decoration: underline;
    }

    @media screen and (min-width:768px) {
        .button__container-text{
            width: 100%;
            display: flex;    
            flex-direction: row;
            align-items:center ;
            justify-content: space-between;
        }
    }
</style>