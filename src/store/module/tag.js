import utils from '../../helper/utils';
const state = { 
    /**liste de tag d'une leçon */
    lessonTagsState: [],

    /**liste des tags selectionnés par l'utilisateur*/
    lessonSelectionTagState: []
};

/**Renvoie du state */
const getters = {
    lessonTagsStateGet: (state)=>state.lessonTagsState,
    lessonSelectionTagGet: (state)=>state.lessonSelectionTagState
};

const actions = {
    /**
     * Récuperation des tags disponible en base de données
     * @param {Object} commit - mutation
     * @param {Object} dataObject - 
     * @property {string} dataObject.inputTagText - input text value
     * @returns 
     */
    async lessonTagAction({commit, dispatch}, dataObject){        
        const inputTagText = dataObject.inputTagText;
        if(inputTagText.length === 0){
            return commit('lessonTagMut', []);
        } else if(inputTagText?.length < 11){
            const tags = await dispatch('actionHandler', { action: 'fetchAction', endPoint: utils.apiDataUrl.findTag, data: {tag: inputTagText}});
            if(!tags){
                return;
            }
            /**Mise a jour du state avec la liste de tag*/
            return commit('lessonTagMut', tags);   
        }  
    },

    /**
     * Ajout d'un tag dans la liste de selection
     * @property {Object} commit - mutation
     * @property {Object} getters - state getter
     * @param {Object} tag - tag a ajouter dans la liste
     */
    addTagToSelection({commit, getters}, tagSelected){
        //tag a ajouter
        const tag = tagSelected.tag
        //Vérification presence de Tag
        const selectionTags = getters.lessonSelectionTagGet;
        if(selectionTags.length < 5){
            const findTag = selectionTags.find(selectionTag => selectionTag.id === tag.id);
            if(!findTag){
                //ajout du tag dans la selection
                selectionTags.push(tag);                
                //passe le status  de sauvegarde à false
                commit('setLessonSaveMut', false);                 
            }
        }
    },

    /**
     * suppression d'un tag de la liste de selection
     * @property {Object} commit - mutation
     * @property {Object} getters - state getter
     * @param {Object} tag - tag a supprimer de la liste de selection
     */
    removeTagFromSelection({commit, getters}, tagSelected){
        //ta a supprimer
        const tag = tagSelected.tag
        const selectionTags = getters.lessonSelectionTagGet;
        selectionTags.forEach((selectionTag, i) => {  
            if(selectionTag.id === tag.id){
                selectionTags.splice(i, 1);
                //passe le status  de sauvegarde de la leçon à false
                commit('setLessonSaveMut', false);
            }
        });
    }
};

const mutations = {    
    /**Mise a jour de la liste de tag d'une lecon*/
    lessonTagMut: (state, lessonTag) => (state.lessonTagsState = lessonTag),

    /**Mise a jour des tag selectionnés */
    lessonSelectionTagMut: (state, lessonSelectionTag) => (state.lessonSelectionTagState = lessonSelectionTag),
};

export default {
    state,
    getters,
    actions,
    mutations
};
