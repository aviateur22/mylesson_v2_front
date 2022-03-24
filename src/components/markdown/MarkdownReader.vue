<template>
    <div class="lesson__markdown-container">
        <div class="lesson__markdown-title-container">
            <h3 class="lesson__markown-title">
                Votre Lesson en <span class="title--black">sortie</span>
            </h3>
        </div>
        <div class="lesson__markdown-text">
            <div class="markdown-body">
                <span v-html="lessonHtml" ></span>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'MarkdownReader',    
    computed: {
        lessonHtml(){
            return this.$store.getters.getLessonEditor.editor.htmlOutput;
        }
    }
};
</script>

<style scoped>

.lesson__markdown-container{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.lesson__markown-title{
    padding: 15px 0px;
    text-transform: uppercase;
    color: var(--main_color_small);    
}

.lesson__markdown-text{    
    padding-top: 2px;
    min-height: 350px;
    height: 100%;
    border-top:0.5px solid white;
    overflow-y: auto;
    text-align: left;
    white-space:pre-wrap;
}

.markdown-body{
    padding-left: 5px;
}

@media screen and (min-width:1024px) {       

    .lesson__markdown-title-container{
        height: 142px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>