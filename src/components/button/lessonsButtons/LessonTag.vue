<template>
    <div class="tag__container">
        <div class="tag__text-container">
            <span class="tag__text">
                {{data.name}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LessonTag',
    props: ['data']

};
</script>

<style scoped>
    .tag__container{
        border:0.1px solid rgb(139, 139, 139);
        margin: 2px;
    }

    .tag__text-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tag__text{
        padding: 5px;
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 700;
        color: rgb(85, 85, 85);
    }
</style>