<template>
  <div class="lesson__main-container">
      <div class="lesson__container">
        <section class="lesson__title-container">
              <h2 class="lesson__title">
                  {{this.lesson.title}}
              </h2>
          </section>
          <section class="lesson__autor-container">
              <h2 class="lesson__autor">
                  {{this.lesson.autor}}
              </h2>
          </section>
          <section class="lesson__date-container">
              <div class="lesson__date-main">
                  <span>{{this.lesson.created}}</span>
                  <span>{{this.lesson.updated}}</span>
              </div>
          </section>
          <section class="lesson__tag-container">
              <div class="lesson__tag-main">
                    <div class="lesson__tag-title">
                        <span>thematic</span>
                    </div>
                    <div class="lesson__tags">
                        <span class="lesson__tag" v-for="(tag, id) in lesson.tags" :key="id">{{ tag.name }}</span>
                    </div>
              </div>              
          </section>
           <section class="lesson__content-container">
              <div class="lesson__content">
                  <div class="markdown-body">
                    <span v-html="content" ></span>
                </div>
              </div>
          </section>
      </div>
  </div>
</template>

<script>
import MarkdownHandler from '../helper/markdown/markdownConverter';
export default {
    name: 'lessonRead',
    methods: {
    },
    computed: {
        /**objet lesson */
        lesson(){              
            return this.$store.getters.getLessonEditor;
        },

        content(){
            /** Markdown pour le html */
            const markdownHandler = new MarkdownHandler();
            return markdownHandler.getHtml(this.lesson.content);        
        }
    }
}
</script>

<style scoped>
.lesson__main-container{
  margin-top:var(--navbar_height) ;
  height: calc( 100vh - var(--navbar_height));
}

.lesson__title{
  text-transform: uppercase;
  font-weight: 800; 
  padding: 25px 0px;
}

.lesson__autor{
    text-transform: uppercase;
    font-size: var(--text_s);
    font-weight: 900;

}

.lesson__date-container{
    padding: 10px 0px;
}

.lesson__date-main{
    display: flex;
    flex-direction: column;
    font-size: var(--text_s);
    font-weight: 700;
    text-transform: uppercase;
}

.lesson__tag-title{
    text-transform: uppercase;
    font-size: var(--text_s);
}

.lesson__tag-container{
    padding: 10px 0px;
}

.lesson__tag-main{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.lesson__tags{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.lesson__tag{
    text-transform: uppercase;
    font-size: var(--text_button_size);
    font-weight: 700;
    padding: 5px;
}

.markdown-body{
    text-align: left;
}
</style>