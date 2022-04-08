<template>
    <!-- lien vers un site exiterne  -->
    <div class="link__footer-container">
        <div class="link">
            <!-- lien https -->
            <a target="blank" :href="data.link" class="link__item">
                {{ data.title }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footerLink',
    props: ['data']
};
</script>

<style scoped>
    .link__footer-container{
        display: flex;
        width: 100%;
        align-items: center;
        padding: 2px 0px;
    }

    .link__item{
        text-decoration: none;
        color: var(--main_color_small);
        font-weight: 700;
        text-transform: uppercase;
        font-size: var(--text_button_size);
        letter-spacing: 0.0rem;
    }

</style>