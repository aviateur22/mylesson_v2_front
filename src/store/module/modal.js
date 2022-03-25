/**
 * gestion de la visibilité de la modal
 */
const state = {     
    /** vivibilité de la modal */
    modalVisibilityState: false
};

/**Renvoie du state */
const getters = {
    /** recupération du status de visibilité de la modal */
    getModalVisibilityState: (state)=>state.modalVisibilityState
};

const actions = {
};

const mutations = {  
    /**mutation visibilté modal */
    setModalVisibilityState: (state, visibilityState)=>(state.modalVisibilityState = visibilityState)
};

export default {
    state,
    getters,
    actions,
    mutations
};
