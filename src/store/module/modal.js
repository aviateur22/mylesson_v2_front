/**recuperation du context d'execution */
import router from '../../router'
const state = {     
    /** vivibilité de la modal */
    modalVisibilityState: false,

    /** text à afficher dans la modal */
    modalTextState: 'Test Modal',

    /**text du bouton valider */
    modalValidateButtonTextState: 'oui',

    /**text du bouton annuler */
    modalRejectButtonTextState: 'non',

    /** données pour action du formulaire */
    dataState: null,
};

/**Renvoie du state */
const getters = {
    modalVisibilityStateGet: (state)=>state.modalVisibilityState,

    modalTextStateGet: (state)=>state.modalTextState,  

    modalValidateButtonTextStateGet: (state)=>state.modalValidateButtonTextState,

    modalRejectButtonTextStateGet: (state)=>state.modalRejectButtonTextState,

    dataStateGet: (state)=>state.dataState
};

const actions = {
    /**
     * Clique sur le bouton valider de la modal
     * @param {*} param0 
     * @returns 
     */
    async continueAction({getters, dispatch, commit}){  
        /**vérification du code d'execution */ 
        const request = await dispatch('actionHandler', {action: getters.dataStateGet.validateActionName, formElement: getters.dataStateGet.data});

        /**reset des données de la modal */
        dispatch('actionHandler', {action: 'resetModalParameter'});
        
        if(request.error){            
            return commit('setModalVisibilityStateMut', false);
        }
        router.push({name: getters.dataStateGet.routerTo});
        return commit('setModalVisibilityStateMut', false);
    },

    /**
     * clique sur le bouton annuler de la modal
     * redirection vers la route demandé
     * @param {*} param0 
     * @returns 
     */
    stopAction({dispatch, getters, commit}){      
        /**vérification du code d'execution */ 
        dispatch('actionHandler', {action: getters.dataStateGet.cancelActionName});
        router.push({name: getters.dataStateGet.routerTo});       
        commit('setModalVisibilityStateMut', false);
        dispatch('actionHandler', {action: 'resetModalParameter'});
    },

    /**
     * 
     */
    resetModalParameter(){
        /** vivibilité de la modal */
        this.modalVisibilityState = null;

        /** text à afficher dans la modal */
        this.modalTextState = null;

        /**text du bouton valider */
        this.modalValidateButtonTextState = null;

        /**text du bouton annuler */
        this.modalRejectButtonTextState = null;

        /** données action modal */
        this.dataState = null;
    }
};

const mutations = {  
    /**mutation visibilté modal */
    setModalVisibilityStateMut: (state, visibilityState)=>(state.modalVisibilityState = visibilityState),

    /**mutation text modal */
    setModalTextStateMut: (state, text)=>(state.modalTextState = text),   

    /**mutation text bouton valider */
    setModalValidateButtonTextStateMut: (state, text)=>(state.modalValidateButtonTextState = text),

    /**mutation text bouton annuler */
    setmodalRejectButtonTextStateMut: (state, text)=>(state.modalRejectButtonTextState = text),

    /** mutation data */
    setDataMut: (state, value)=>(state.dataState = value)
};

export default {
    state,
    getters,
    actions,
    mutations
};
