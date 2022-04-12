<template>
    <div class="loader__container">
        <!--Loader -->
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'markdownAction'
};
</script>

<style scoped>
    .loader__container{       
        text-align: center;        
        width: 40px;    
        height: 40px;    
        display: flex;        
        align-items: center;
        justify-content: center;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        border-radius: 50%;
        padding: 10px 0px;
        cursor: pointer;
        background: white;

    }

    .spinner {        
        width: 100px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .spinner > div {
        width: 3px;
        height: 3px;
        background-color:var(--main_color_small);
        border-radius: 100%;
        display: inline-block;
        margin: 2px;        
    }

    .spinner .bounce1 {  
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
</style>