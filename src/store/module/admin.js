/**
 * Centralisation des requêtes API
 */
import utils from '../../helper/utils';

const state = {     
};

const getters = {   
};

const actions = {

    async getUsersRequest({dispatch}){
        /** endpoint de la requete*/
        const endPoint = utils.adminApi.getUsersUpgradeRoleRequest.endPoint;

        /** methode de la requete */
        const method = utils.adminApi.getUsersUpgradeRoleRequest.method;

        /**reuête pour récupérer les utilisateur */
        const getUsers = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });  

        return getUsers;
    },

    async updateUserRole({dispatch, commit}, data){
        /** endpoint de la requete*/
        const endPoint = utils.adminApi.updateUserRole.endPoint.replace(':userId', data.userId);

        /** methode de la requete */
        const method = utils.adminApi.updateUserRole.method;

        /**reuête pour récupérer les utilisateur */
        const updateRole = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method});

        /** echec de la requete */
        if(!updateRole){            
            return;
        }

        /**Requete ok - succes de la demande */        
        return commit('setFlashMessageMut', { error: false, message: 'Profile utilisateur mis a jour'});
    }
};

const mutations = {   
};

export default {
    state,
    getters,
    actions,
    mutations
};
