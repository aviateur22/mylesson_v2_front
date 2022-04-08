/**
 * gestion de la visibilité de la modal
 */
const state = {     
    /** vivibilité de la modal */
    modalVisibilityState: false,
    
    /** modal pour affichage de text */
    textDisplay: false,
};

/**Renvoie du state */
const getters = {
    /** recupération du status de visibilité de la modal */
    getModalVisibilityState: (state)=>state.modalVisibilityState,

    /** renvoir moadal text */
    getTextDisplayState: (state)=>state.textDisplay
};

const actions = {
};

const mutations = {  
    /**mutation visibilté modal */
    setModalVisibilityState: (state, visibilityState)=>(state.modalVisibilityState = visibilityState),

    /** modification de la valeur textDisplat */
    setTextDisplay: (state, value)=>(state.textDisplay = value),
};

export default {
    state,
    getters,
    actions,
    mutations
};
