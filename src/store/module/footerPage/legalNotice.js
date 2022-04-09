const state = { 
    legalNotice: {
        title: 'mentions légales',
        articles: [
            {
                title: 'Publication',
                content: `ce site est publié par la société CTOUTWEB <br>
                RCS 911 273 852 <br>
                directeur Cyrille Cadé <br>
                contact ctoutweb@gmail.com <br>
                AUTERIVE 31190 <br>
                Hebergeur: Front-end netlify - back-end heroku`
            }
        ]
    }
};

const getters = {   
    /** renvoie ma description */
    getLegalNotice: (state)=>state.legalNotice
};

const actions = {   
};

const mutations = {   
};

export default {
    state,
    getters,
    actions,
    mutations
};