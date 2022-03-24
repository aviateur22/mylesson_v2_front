/**
 * centralisation du trycatch pour les actions
 */
const actions = {
    async actionHandler({dispatch, commit}, payload){
        try {            
            return await dispatch(payload.action, payload);   
        } catch (err) {      
            /** vérifictaion réponse de axios*/                  
            if(err.response && Number(err.response.status) < 500) {                
                /**erreur 401 - session expirée */
                if(Number(err.response.status) === 401){
                    /** réinitilisation de la session */
                    return dispatch('resetUserAuth', {message: 'session expirée merci de vous reconnecter', pathName: 'HomePage'});
                }                
                /** affichages des erreurs managées */
                commit('setFlashMessageMut', { error: true, message: err.response.data.message});       
            } else {
                console.log(err)
                /** affichage d'un message genral si erreur non managée */
                return commit('setFlashMessageMut', { error: true, message: 'oups erreur'});
            }      
        }
    }
};
export default {
    actions    
};
