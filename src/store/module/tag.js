import utils from '../../helper/utils';
const state = {   
    /** tag selectionné par l'utilisateur */  
    selectedTags: [],
    /** tag proposés */
    proposalTags: []
};

/**Renvoie du state */
const getters = {
    /** liste des tags selectionnés */
    getSelectedTags: (state)=>state.selectedTags,

    /** liste des tags proposés */
    getProposalTags: (state)=>state.proposalTags
};

const actions = {
    /**
     * Récuperation des tags disponible en base de données
     * @param {Object} commit - mutation
     * @param {Object} dataObject - 
     * @property {string} dataObject.inputTagText - input text value
     * @returns 
     */
    async getTagsByName({commit, dispatch}, data){        
        const inputTagText = data.inputTagText;

        /** données url API */
        const endPoint = utils.tagApi.findTagByName.endPoint.replace(':name', inputTagText);

        const method = utils.tagApi.findTagByName.method;

        if(inputTagText.length === 0){
            /** vide la liste de proposition */
            return commit('setProposalTag', []);            
        } else if(inputTagText?.length < 11){
            const tags = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });
            /** si pas de reponse */
            if(!tags){
                return;
            }

            /**Mise a jour du state avec la liste de tag*/
            return commit('setProposalTag', tags);   
        }  
    },

    /**
     * Ajout d'un tag dans la liste de selection
     * @property {Object} commit - mutation
     * @property {Object} getters - state getter
     * @param {Object} tag - tag a ajouter dans la liste
     */
    async addSelectedTag({getters, commit}, data){
        //tag a ajouter
        const tagSelected = data.tagSelected;
        
        //Vérification presence de Tag
        const selectedTags = getters.getSelectedTags;
       
        if(selectedTags.length < 5){
            const findTag = selectedTags.find(tag => tag.id === tagSelected.id);
            if(!findTag){
                //ajout du tag dans la selection                
                selectedTags.push(tagSelected);
                commit('setSelectionTag', selectedTags);                                            
            }
        }
    },

    /**
     * suppression d'un tag de la liste de selection
     * @property {Object} commit - mutation
     * @property {Object} getters - state getter
     * @param {Object} tag - tag a supprimer de la liste de selection
     */
    removeSelectedTag({commit, getters}, data){
        //tag à supprimer
        const tagSelected = data.tagSelected;
        //liste des tags selectionnés
        const selectedTags = getters.getSelectedTags;
        selectedTags.forEach((selectionTag, i) => {  
            if(selectionTag.id === tagSelected.id){                
                selectedTags.splice(i, 1); 
                commit('setSelectionTag', selectedTags);         
            }
        });
    }
};

const mutations = {    
    /**update liste des propositions de tag*/
    setProposalTag: (state, proposalTag) => (state.proposalTags = proposalTag),

    /** update liste des tags selectionnés */
    setSelectionTag: (state, selectionTag) => (state.selectedTags = selectionTag),
};

export default {
    state,
    getters,
    actions,
    mutations
};
