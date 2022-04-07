<template>
    <section class="thematic">
        <div class="thematic__container">
            <div class="thematic__title-container">
                <h3 class="thematic__title">{{dataItems.title}}</h3>
            </div>
            <div class="thematic__body">                
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'footerSubcatgerory',
    props: ['dataItems']
};
</script>

<style scoped>
    .thematic{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .thematic__title-container{
        display: flex;
        justify-content: flex-start;

    }

    .thematic__title{
        padding: 10px 0px;
        font-size: var(--text_button_size);
        text-transform: uppercase;
        text-decoration: underline;
        font-weight: 700;
        color: white;
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
</style>