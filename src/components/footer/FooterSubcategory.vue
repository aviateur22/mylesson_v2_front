<template>
    <section class="thematic">
        <div class="thematic__container">
            <div class="thematic__title-container">
                <h3 class="thematic__title">{{dataItems.title}}</h3>
                <div class="thematic__title-border"/>
            </div>
            <div class="thematic__body">   
                <ButtonText @click="displayPage(item.url)" v-for="(item, i) in dataItems.items" :text="item.text" :key="i"/>
            </div>
        </div>
    </section>
</template>

<script>
import ButtonText from '../button/ButtonText.vue';
export default {
    name: 'footerSubcatgerory',
    props: ['dataItems'],
    components: {
        ButtonText
    },
    methods: {
        /** affichage de la page */
        displayPage(item){
            this.$router.push({path: item });
        }
    }
};
</script>

<style scoped>
    .thematic{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-top: 20px;
    }

    .thematic__title-container{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 15px;
    }

    .thematic__title{    
        font-size: var(--text_button_size);
        text-transform: uppercase;
        font-weight: 700;
        padding-bottom: 10px;
        color: white;
        width: 100%;
    }

    .thematic__title-border{
        width: 100%;
        border-bottom: 0.1px solid white;
    }

    .thematic__body{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .thematic__item{
        padding: 5px 0px;
        text-transform: uppercase;
        color: white;
        font-size: var(--text_s);
        font-weight: 700;
        cursor: pointer;   
    }

    @media screen and (min-width:768px) {
        .thematic{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-top: 0px;
        }
    }
</style>