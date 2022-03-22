/**
 * centralisation du trycatch pour les actions
 */
const actions = {
    async actionHandler({dispatch, commit}, payload){
        try {
            return await dispatch(payload.action, payload);   
        } catch (err) {
            console.log(err);
            commit('setFlashMessageMut', { error: true, message: 'oups erreur'});
        }
    }
};
export default {
    actions    
};
