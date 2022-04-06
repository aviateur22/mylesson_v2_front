<template>
    <div class="rounded__container">
        <button class="rounded__button">X</button>
    </div>  
</template>

<script>
export default {
    name: 'roundeButton',
};
</script>

<style scoped>
    .rounded__container{    
        display: flex;    
        align-items: center;
        justify-content: center;
        position: absolute;
        top:0px;
        right: 0px;
        padding: 5px;
    }

    .rounded__button{
        /* box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px; */
        background: rgba(255,255,255,0.2);
        height: 25px;
        width: 25px;
        border-radius: 50%;
        color: red;
        transition: all var(--transition_standard) ease-in-out;
        cursor: pointer;
    }

    .rounded__button:hover{
        background: rgba(7, 6, 6, 0.5);
        font-size: var(--text_s);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 0px, rgba(0, 0, 0, 0.24) 0px 0px 0px;

    }

</style>