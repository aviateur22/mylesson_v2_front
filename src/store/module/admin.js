import utils from '../../helper/utils';
import router from '../../router';

const state = {     
};

const getters = {   
};

const actions = {

    /**
     * Récupération des utilisateurs voulant pouvoir éditer
     * @param {*} param0 
     * @returns 
     */
    async getUsersRequest({dispatch}){
        /** endpoint de la requete*/
        const endPoint = utils.adminApi.getUsersUpgradeRoleRequest.endPoint;

        /** methode de la requete */
        const method = utils.adminApi.getUsersUpgradeRoleRequest.method;

        /**reuête pour récupérer les utilisateur */
        const getUsers = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });  

        return getUsers;
    },

    /**
     * donne les droit d'édition à un utilisateur 
     * @property {Object} param.dispatch
     * @property {Number} data.userId 
     * @returns {object}
     */
    async updateUserRole({dispatch, commit}, data){
        /** endpoint de la requete*/
        const endPoint = utils.adminApi.updateUserRole.endPoint.replace(':userId', data.userId);

        /** methode de la requete */
        const method = utils.adminApi.updateUserRole.method;

        /**reuête pour récupérer les utilisateur */
        const updateRole = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData});

        /** echec de la requete */
        if(!updateRole){            
            return;
        }

        return commit('setFlashMessageMut', { error: false, message: 'Droits d\'édition accordés'});        
    },

    /**
     * suppression privilege utilisateur
     * @property {object} param.dispatch 
     * @property {Text} data.userLogin
     * @returns 
     */
    async removeUserPrivilegeByUserLogin({getters, dispatch, commit}, data){
        /** login de l'autor de la lecon */
        const userLogin = getters.getLessonEditor.autor;

        if(!userLogin){
            return null;
        }

        /** endpoint de la requete*/
        const endPoint = utils.adminApi.removeUserPrivilegeByUserLogin.endPoint.replace(':userLogin', userLogin);

        /** methode de la requete */
        const method = utils.adminApi.removeUserPrivilegeByUserLogin.method;

        /**reuête pour récupérer les utilisateur */
        const updateRole = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData});

        /** echec de la requete */
        if(!updateRole){            
            return;
        }

        /**Requete ok - succes de la demande */        
        return commit('setFlashMessageMut', { error: false, message: `Les priviléges de ${userLogin} sont supprimées`});
    },

    async removeUserPrivilegeByUserId({ dispatch, commit}, data){        
        /** id utilsateur */
        const userId = data.userId;

        /**controlle de userID */
        if(!userId || isNaN(userId)){
            return;
        }

        /** endpoint de la requete*/
        const endPoint = utils.adminApi.removeUserPrivilegeByUserId.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.adminApi.removeUserPrivilegeByUserId.method;

        /**reuête pour récupérer les utilisateur */
        const updateRole = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData});

        /** echec de la requete */
        if(!updateRole){            
            return;
        }

        /**Requete ok - succes de la demande */        
        return commit('setFlashMessageMut', { error: false, message: 'Droits d\'édition refusés'});
    },

    /**
     * suppression utilisateur par son login
     * @property {object} param.dispatch
     * @property {object} param.commit
     * @param {Object} data 
     * @returns 
     */
    async deleteUserByLogin({getters, dispatch, commit}, data) {
        /** login de l'autor de la lecon */
        const userLogin = getters.getLessonEditor.autor;

        if(!userLogin){
            return null;
        }

        /** endpoint de la requete*/
        const endPoint = utils.adminApi.deleteUserByLogin.endPoint.replace(':userLogin', userLogin);

        /** methode de la requete */
        const method = utils.adminApi.deleteUserByLogin.method;

        /**reuête pour récupérer les utilisateur */
        const deleteUser = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData});

        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: `l'utilisateur ${userLogin} est supprimées de la base de données`});
    },

    /**
     * suppresion d'un lecon par son id
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getter
     * @property {Object} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async adminDeleteLessonById({dispatch, getters, commit}, data){  
        /** id de la lecon a supprimer */            
        const lessonId = getters.getLessonEditor.id;

        /** si pas de lecon */
        if(!lessonId){
            return null;
        }

        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.deleteLessonById.endPoint.replace(':id', lessonId);
        
        /** methode de la requete */
        const method = utils.lessonApi.deleteLessonById.method;

        const deleteLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method, formData: data.formData});
        
        /** Si pas d'erreur lors de la requête*/
        if(!deleteLesson){            
            return null;
        }

        commit('setFlashMessageMut', { error: false, message: 'la leçon est bien supprimée'});        

        return router.push({name: 'HomePage'}); 
    },

    /**
     * Récupération de toutes les lecons avec contenu abusif
     * @property {Object} param.dispatch
     * @returns 
     */
    async getAllAbusiveLesson({dispatch}){       
        /** endpoint de la requete*/
        const endPoint = utils.adminApi.getAbusiveLesson.endPoint;
        
        /** methode de la requete */
        const method = utils.adminApi.getAbusiveLesson.method;

        /** récupération des lecons abudifs*/
        const lessons = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method });
        
        return lessons;
    },

    /**
     * renvoie le nombre d'enregistrement
     * @param {*} param0 
     * @param {*} data 
     * @returns 
     */
    async countData({dispatch}, data){
        /** endpoint de la requete*/
        const endPoint = data.endPoint;
        
        /** methode de la requete */
        const method = data.method;

        /** récupération des lecons abudifs*/
        const count = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method });

        return count;
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
