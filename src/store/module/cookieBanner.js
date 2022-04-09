const state = { 
    showCookieBanner: false
};

const getters = {   
    /** renvoie l'etate de la banniere des cookies */
    getCookieBannerState: (state)=>state.showCookieBanner
};

const actions = {   
};

const mutations = { 
    setCookieBanner: (state, value)=>(state.showCookieBanner = value),
};

export default {
    state,
    getters,
    actions,
    mutations
};