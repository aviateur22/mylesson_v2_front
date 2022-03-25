/**
 * module permettant de gerer le refus ou confirmation d'une action
 */
import router from '../../router';
const state = {
    /**
     * données pour la vue ConfirmationRequest:
     * confirmationRequestText: '',
     * validateButtonText: '',
     * cancelButtonText: '',
     * confirmationData: {
            ValidationData: 
            cancelationData: 
            validateActionName:  
            cancelActionName: 
            routerTo: 
     */    
    confirmationData: {},
};

/**Renvoie du state */
const getters = {
    /** récuperation des donnée dse la modal */
    getConfirmationData: (state)=>state.confirmationData
};

const actions = {
    /**
     * Clique sur le bouton valider de la modal
     * @param {*} param0 
     * @returns 
     */
    async continueAction({getters, dispatch, commit}){  
        /** nom de l'action a executer */
        const action = getters.getConfirmationData.confirmationData.validateActionName;

        /** données pour executer de l'action */
        const formData = getters.getConfirmationData.confirmationData.ValidationData;      
        
        /** path de redirection apres l'action */
        const routerTo = getters.getConfirmationData.confirmationData.routerTo;
        
        const request = await dispatch('actionHandler', { action, formData });

        /**reset des données du store */
        commit('setConfirmationData', {});
        
        if(!request){ 
            /** masque la modal */           
            return commit('setModalVisibilityState', false);
        }

        router.push({name: routerTo});

        /** masque la modal */  
        return commit('setModalVisibilityState', false);
    },

    /**
     * clique sur le bouton annuler de la modal
     * redirection vers la route demandé
     * @param {*} param0 
     * @returns 
     */
    stopAction({dispatch, getters, commit}){      
        /** nom de l'action a executer */
        const action = getters.getConfirmationData.confirmationData.cancelActionName;

        /** données pour executer de l'action */
        const data = getters.getConfirmationData.confirmationData.cancelationData;

        /** path de redirection apres l'action */
        const routerTo = getters.getConfirmationData.confirmationData.routerTo;

        /**vérification du code d'execution */ 
        dispatch('actionHandler', { action, data });

        /**reset des données du store */
        commit('setConfirmationData', {});

        router.push({name: routerTo});
    },
};

const mutations = {  
    /** modification des donnée */
    setConfirmationData: (state, data)=>(state.confirmationData = data),
};

export default {
    state,
    getters,
    actions,
    mutations
};
