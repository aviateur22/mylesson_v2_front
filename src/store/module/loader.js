/**
 * gestion de l'affichage du loader
 */
const state = { 
    /** initialisation du loader */
    loaderState: true
};

const getters = {
    /**
     * récupération de l'etat du loader
     */
    getLoaderStatus: (state)=>state.loaderState
};

const actions = {
};

const mutations = {    
    /**
     *  Update le loader
     */
    setLoaderState: (state, value)=>(state.loaderState = value)
};

export default {
    state,
    getters,
    actions,
    mutations
};
