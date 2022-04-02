<template>
<!-- contenu de la lecon -->
  <div class="content__container">
      <div class="content">
          <div class="markdown-body">
                <span v-html="content" ></span>
            </div>
      </div>
  </div>
</template>

<script>
import MarkdownHandler from '../../helper/markdown/markdownConverter';
export default {
    name: 'content',
    computed: {
        /** données de la lecon */
        lesson(){
            return this.$store.getters.getLessonEditor;
        },
        /** contenu */
        content(){
            /** Markdown pour le html */
            const markdownHandler = new MarkdownHandler();
            return markdownHandler.getHtml(this.lesson.markdownText);  
        }
    }
};
</script>

<style scoped>
    .markdown-body{
        text-align: left;
}
</style>