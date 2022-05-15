import { compileTemplate } from '@vue/compiler-sfc';
import utils from '../../helper/utils';
import router from '../../router';

const state = { 
    /** nouvelle notification */  
    newNotification: 0,
};

const getters = {   
    getNewNotification: (state) => state.newNotification
};

const actions = {   
    /**
     * récupération des notifications par id utilisateur
     */
    async getNotificationByUserId({getters, dispatch}){
        const userId = getters.getUserIdent.id;

        if(!userId || isNaN(userId)){
            return;
        }
        /** endpoint de la requete*/
        const endPoint = utils.notificationApi.findNotificationByUserId.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.notificationApi.findNotificationByUserId.method;

        /**reuête pour récupérer les notifications */
        const getNotification = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });  

        return getNotification;
    },

    /**
     * suppression notification par son id
     */
    async deleteNotificationById({getters, dispatch, commit}, data){
        /** notifcation id */
        const notificationId = data.notificationId;

        if(!notificationId || isNaN(notificationId)){
            return;
        }
        /** endpoint de la requete*/
        const endPoint = utils.notificationApi.deleteNotification.endPoint.replace(':notificationId', notificationId);

        /** methode de la requete */
        const method = utils.notificationApi.deleteNotification.method;

        /**suppression de la notification  */
        await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: Object.fromEntries(data.formData.entries()) });                  
        
        /** mise a jour du nombre de notification non lu*/
        dispatch('actionHandler', { action: 'countNotificationUnreadByUserId', userId: getters.getUserIdent.id});
        
        commit('setFlashMessageMut', { error: false, message: 'notification supprimée'});
    },

    /**
     * lecture notification
     */
    async readNotificationById({getters, dispatch, commit}, data){
        /** notifcation id */
        const notificationId = data.notificationId;

        if(!notificationId || isNaN(notificationId)){
            return;
        }
        /** endpoint de la requete*/
        const endPoint = utils.notificationApi.readNotificationById.endPoint.replace(':notificationId', notificationId);

        /** methode de la requete */
        const method = utils.notificationApi.readNotificationById.method;

        /**reuête  */
        await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: Object.fromEntries(data.formData.entries()) });                  
        
        /** mise a jour du nombre de notification non lu*/
        dispatch('actionHandler', { action: 'countNotificationUnreadByUserId', userId: getters.getUserIdent.id});
    },

    /**
     * compte les notification non lu 
     */
    async countNotificationUnreadByUserId({dispatch, commit}, data){
        const userId = data.userId;

        if(!userId || isNaN(userId)){
            return;
        }
        /** endpoint de la requete*/
        const endPoint = utils.notificationApi.countNotificationByUserId.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.notificationApi.countNotificationByUserId.method;

        /**reuête pour récupérer les notifications */
        const getNotificationCount = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });          
        
        commit('setNewNotification', getNotificationCount.notificationCount);
    }
};

const mutations = { 
    /** mise a jour du nombre de notification */  
    setNewNotification: (state, value)=>(state.newNotification = value)
};

export default {
    state,
    getters,
    actions,
    mutations
};
