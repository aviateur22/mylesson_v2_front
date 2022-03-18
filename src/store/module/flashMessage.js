const state = { 
    // message de redirection
    flashMessageState: { error: true, message: 'Hello'}
};

const getters = {
    /**
     * récupération du message flash
     */
    getFlashMessage: (state)=>state.flashMessageState
};

const actions = {
    /**
     * commit de isLogin
     */
    async setFlashMessageAct({commit}, message){         
        /** mutation du state */
        commit('setflashMessageMut', message);
    }
};

const mutations = {    
    /**
     *  Update du flashMessage state
     */
    setFlashMessageMut: (state, message)=>(state.flashMessageState = message)
};

export default {
    state,
    getters,
    actions,
    mutations
};
