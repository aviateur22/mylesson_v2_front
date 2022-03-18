<template>
<div class="container">
    <div class="error__container">
        <div class="notfound__container-title">
            <h2 class="notfound__title">
                <span class="notfound__title-span">
                    oupsss
                </span>
                 impossible d'afficher la page demandée
            </h2>
        </div>
        <div class="notfound__img-container">
            <img src='../assets/img/404.png' alt="image avec des fleches de directions" class="notfound__img">
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
        height: 100vh;
        margin-top: var(--navbar_height);
    }

    .error__container{
        display: flex;
        flex-direction: column;
    }

    .notfound__title{
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        font-weight: 600;
        padding:20px 5px;
        color:var(--main_color)
        
    }

    .notfound__title-span{
        text-transform: uppercase;
        font-size: 1.5rem;
        padding: 20px 5px;
        font-weight: 900;
        color: rgb(177, 177, 177);
    }

    .notfound__img{
        max-width: 100%;
    }

</style>