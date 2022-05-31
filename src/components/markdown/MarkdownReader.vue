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
    data(){
        return {
            /**lesson au format html */
            lessonHtml: undefined
        };
    },
    methods: {
        /**transformation markdown en html */
        async getHtmlFromMarkdown(){
            /**text markdown */
            const markdownText = this.$store.getters.getLessonEditor.markdownText;
            
            const formData = new FormData();
            formData.append('markdownText', markdownText);

            /**requete pour convertir le markdwon */
            const html = await this.$store.dispatch('actionHandler', { action: 'lessonHtmlFromMarkdown', formData: Object.fromEntries(formData.entries())});
            
            /**text au format html */
            this.lessonHtml = html.content;
        }
    },  
    computed: {
        // lessonHtml(){
        //     return this.$store.getters.getLessonEditor.htmlOutput;
        // }
    },
    created(){
        this.getHtmlFromMarkdown();
    }
};
</script>

<style scoped>

.lesson__markdown-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
}

.lesson__markdown-title-container{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.lesson__markown-title{
    padding: 15px 0px;
    text-transform: uppercase;
    color: var(--main_color_small);    
}

.lesson__markdown-text{    
    padding-top: 2px;
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

}
</style>