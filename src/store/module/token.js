import utils from '../../helper/utils';

const state = {  
    /** token visitor */
    visitor: undefined   
};

const getters = {   
    /**récupération token visitor */
    getVisitor: (state)=> state.visitor
};

const actions = {
    /**
     * Génération token + JWT pour requete apres être authentifié
     * @param {Object} dispatch
     */
    async createToken({getters, dispatch}, data) {
        /** id utilisateur */
        const userId = getters.getUserIdent?.id ? getters.getUserIdent.id : data.userId;

        /** vérification userid*/
        if(!userId){
            return this.$store.commit('setFlashMessageMut', { error: true, message: 'echec génération token'});
        }

        /** endpoint de la requete*/
        const endPoint = utils.tokenApi.createTokenForm.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.tokenApi.createTokenForm.method;

        /**reuête pour récupérer les utilisateur */
        const token = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });

        if(!token){
            return null;
        }

        return token;
    },

    /**
     * Génération token + JWT pour éditer une lecon apres être authentifié 
     * @param {Object} dispatch
     */
    async createTokenLessonEditor({getters, dispatch}) {
        /** id utilisateur */
        const userId = getters.getUserIdent.id;

        /** vérification userid*/
        if(!userId){
            return this.$store.commit('setFlashMessageMut', { error: true, message: 'echec génération token'});
        }

        /** endpoint de la requete*/
        const endPoint = utils.tokenApi.createTokenLessonEditor.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.tokenApi.createTokenLessonEditor.method;

        /**reuête pour récupérer les utilisateur */
        const token = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });

        if(!token){
            return null;
        }

        return token;
    },

    /**
     * Génération token + JWT pour requete sans être authentifié
     * @param {Object} dispatch 
     */
    async createTokenVisitor({dispatch}) {
        /** endpoint de la requete*/
        const endPoint = utils.tokenApi.createTokenVisitor.endPoint;

        /** methode de la requete */
        const method = utils.tokenApi.createTokenVisitor.method;

        /**reuête pour récupérer les utilisateur */
        const token = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });

        if(!token){
            return null;
        }

        return token;
    }    
};

const mutations = {
    /**
     *mise a jour du token visitor
     */
    setVisitor: (state, value) => (state.visitor = value)   
};

export default {
    state,
    getters,
    actions,
    mutations
};
