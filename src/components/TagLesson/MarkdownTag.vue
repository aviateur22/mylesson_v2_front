<template>
  <div class="container">
      <div class="main__container">
            <div class="form__group">                   
                <label for="tag" class="form__label">tag(s) de votre leçon</label>
                <section class="tag__input-section">
                  <!-- input pour marquer son tag -->
                  <div class="tag__input-container">     
                      <transition-group name="tag-selection">
                          <MarkdownTagSelection class="tag-selection" :tag="tag" @click="removeSelectedTag(tag)" v-for="(tag, id) in selectedTags" :key="id"/>
                      </transition-group>                        
                        <input placeholder="tag(s)" class="form__input" v-model="tag"  @keyup="findTagByName" type="text" name="tag" id="tag">

                        <!-- input caché pour la récuperation des id de tags  -->
                        <input id="tagId" name="tagId" type="hidden">
                  </div>

                  <!-- si pas de résultat de tag -->
                   <div class="tag__proposal-container no--result" v-if="tag && tags?.length===0">
                        <span class="tag__no-result">
                            pas de résultat
                        </span>
                    </div> 

                  <!-- liste de proposition de tag -->
                  <div v-if="tags" class="tag__proposal-container">
                      <button @click="this.$store.commit('lessonTagMut', []); tag = null" class="tag_proposal-close">
                        x
                      </button>
                      <div class="tag__proposal">
                            <!-- tag -->
                            <MarkdownTagProposal ref="tag" :tag="tag" @click="addSelectedTag(tag)" v-for="(tag, id) in tags" :key="id"/>
                      </div>                      
                  </div>
                </section>
            </div>
      </div>
  </div>
</template>

<script>
import MarkdownTagProposal from './MarkdownTagProposal.vue';
import MarkdownTagSelection from './MarkdownTagSelection.vue';
export default {    
    name: 'MarkdownTag',
    components: {
        MarkdownTagProposal,
        MarkdownTagSelection
    },
    data() {
        return {  
            tag: null
        };
    },
    props: ['filterLesson'],
    methods: {
        /**
         * recherche d'un tag en base de données
         */
        async findTagByName(e){
            try {                
                this.$store.dispatch('actionHandler', { action: 'getTagsByName', inputTagText: this.tag});                
            } catch (error) {                
                console.log(error);
            }
        },

        /**
         * selection tag
         */
        addSelectedTag(tagSelected){
            this.$store.dispatch('actionHandler', { action: 'addSelectedTag', tagSelected});
            /** home page - filtre les lecon par tag */
            if(this.filterLesson){

            } else {
                //Ajout des tags dans le lessonStore
                this.$store.commit('setLessonTags', this.$store.getters.getSelectedTags);   
                /** status sauvegarde = false*/ 
                this.$store.commit('setLessonSaveStatus', false);            
            }
        },

        removeSelectedTag(tagSelected){   
            this.$store.dispatch('actionHandler', { action: 'removeSelectedTag', tagSelected });  
            /** home page - filtre les lecon par tag */
            if(this.filterLesson){

            } else {
                //Ajout des tags dans le lessonStore
                this.$store.commit('setLessonTags', this.$store.getters.getSelectedTags);
                
                /** status sauvegarde = false*/
                this.$store.commit('setLessonSaveStatus', false);                
            }         
        },

        /**
         * Renseignement des tag_id avant soumission du formulaire 
         */
        setTagId(){
            const tagIdElement = document.getElementById('tagId');
            tagIdElement.value = '';

            //Remplissage input 
            this.selectedTags.forEach((selectionTag, id) =>{
                if(tagIdElement.value === ''){
                    tagIdElement.value += selectionTag.id;    
                } else {
                    tagIdElement.value += '/' + selectionTag.id;
                }                
            });

            //renvoie du contenue de l'hidden input
            return tagIdElement.value;
        }
    },
    computed: {
        /** liste de tag disponible */
        tags(){
            return this.$store.getters.getProposalTags;
        },

        /**Liste des tags selectionnés */
        selectedTags(){
            return this.$store.getters.getSelectedTags;
        }
    }
};
</script>

<style scoped>
    .container{
        display: flex;
        width: 100%;
        padding: 10px;    
    }

    .main__container{
        width: 100%;
    }

    .form__group{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
    }

    .form__label{
        text-align: left;
        width: 100%;
        text-transform: uppercase;
        font-size: 0.8rem;
        padding: 5px 0px;
        font-weight: 800;
    }    

    .tag__input-section{
        width: 100%;
    }

    .tag__input-container{    
        width: 100%;
        display: flex;
        
        background: rgb(255,255,255);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    }
    .form__input{
        width: 100%;
        height: 45px;
        border: none;
        background: inherit;
        padding-left: 5px;
        outline: none;
    }

    .tag__proposal-container{        
        position: relative;
        background: rgba(255, 255, 255, 0.9);
        width: 100%;    
        margin-top: 5px;
        padding-right: 20px;

    }

    .tag_proposal-close{
        position: absolute;
        border: none;
        cursor: pointer;
        right: 5px;
        top: 5px;
        width: 20px;
        height: 20px;
        background: transparent;       
    }

    .tag__proposal{
        display: flex; 
        justify-content: center; 
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }

    .tag-selection{
        transition: all var(--transition_group_animation);
    }

   .tag-selection-enter, .tag-selection-leave-to{
        opacity: 0;
        transform: scale(0);
    }

    .tag-selection-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .tag__no-result{
        text-transform: uppercase;      
        font-size: var(--text_s);
        font-weight: 800;
    }

    @media screen and (min-width:768px) {
        .tag__proposal-container{
            padding: 0px 15px;
            
        }
        .tag__proposal{            
            text-align: center;
            justify-content:center; 
        }
    }
</style>