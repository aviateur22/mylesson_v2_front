/**données API et url des pages*/
import utils from '../../helper/utils';

const state = {       
    thematic: {
        /** thematiques de disponible */
        thematics: []
    } 
    
};

const getters = {  
    /** renvoie les thématiques */
    getThematics: (state)=> state.thematic.thematics  
    
};

const actions = {   
    async getAllThematic({dispatch, commit}){
        /** endpoint de la requete*/
        const endPoint = utils.thematicApi.getAllThematic.endPoint;

        /** methode de la requete */
        const method = utils.thematicApi.getAllThematic.method;

        const getAllThematic = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method });
        
        commit('setThematics', getAllThematic);
        return getAllThematic;
    }
};

const mutations = {
    /**mise a jours des thematiques disponibles */
    setThematics: (state, value) =>(state.thematic.thematics = value)
   
};

export default {
    state,
    getters,
    actions,
    mutations
};
