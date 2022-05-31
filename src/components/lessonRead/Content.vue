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
        content(){
            return this.$store.getters.getLessonEditor.htmlOutput;
        }
    }
};
</script>

<style scoped>
    .markdown-body{
        text-align: left;
        padding-left: 10px;
}
</style>