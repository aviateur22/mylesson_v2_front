<template>
    <div class="title-container">
        <!-- titre de la leçon -->
        <h3 class="title__text">{{ data.title }}</h3>
        <!-- date de creation -->
        <span class="title__date">{{data.created_at}}</span>           
        <!-- tags de la lecon -->
        <section class="title__tag-container">
            <div class="title__tag">
                <LessonTag v-for="(tag,id) in data.lessonsTags" :key="id" :data='tag'/>
            </div>                
        </section>  
        <!-- résumé de la lecon -->
        <section class="title__summary">
            <p class="title__summary-text">{{ data.summary}}</p>                
        </section>
    </div>
</template>

<script>
import LessonTag from './LessonTag.vue';
export default {
    name: 'titleContainer',
    components: {
        LessonTag
    },
    props: ['data']
};
</script>

<style scoped>
    .title-container{
        padding: 15px 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .title__date {
        font-size: var(--text_s);
        padding: 10px 0px;
        font-weight: 900;
        text-transform: uppercase;
        color: var(--secondary_color)
    }

    .title__text{
        padding: 10px 0px;
        text-transform: uppercase;
        font-weight: 900;
        font-size: var(--form_title_size);
        color: var(--main_color);
    }

    .title__tag-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title__tag{
        display: flex;
        color: var(--main_color_small)
    }

    .title__summary{
        width: 100%;
        padding-top: 30px;
        padding-bottom: 10px;
    }

    .title__summary-text{
        text-align: left;
    }
</style>