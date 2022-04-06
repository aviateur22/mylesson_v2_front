/**données API et url des pages*/
import utils from '../../helper/utils';

const state = {        
    //données utilisateur après connexion
    userIdentState: {},
};

const getters = {    
    
};

const actions = {    
    
    /**
     * recuperation image media Sociaux
     * @property {Object} param.dispatch - action 
     * @param {String} data.mediaName - nom du média pour l'image
     * @returns {String} url de l'image
     */
    async getLinkByName({dispatch}, data){
        /** nom du media  */
        const mediaName = data.mediaName;

        /** endpoint de la requete*/
        const endPoint = utils.linkApi.getLinkByName.endPoint.replace(':media', mediaName);

        /** methode de la requete */
        const method = utils.linkApi.getLinkByName.method;       

        const imageUrl = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });  

        /** echec recuperation image  */
        if(!imageUrl){
            return;
        }
        
        return imageUrl.pathUrl;
    },

    /**
     * suavegarde du lien media github , linkedin.....
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getters
     * @property {Object} param.commit - commit
     * @property {Object} data.dataForm - donnée du liens a enregistrer
     */
    async saveLinkMedia({dispatch, getters, commit}, data){
        /** id utilisateur */
        const userId = getters.getUserIdent.id;

        /** endpoint de la requete*/
        const endPoint = utils.linkApi.saveLinkByUserId.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.linkApi.saveLinkByUserId.method;

        const saveLinkMedia = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

        if(!saveLinkMedia){
            return null;
        }

        /**
         * mise a jour du profil utilisateur
         */
        commit('setUserProfilData', saveLinkMedia);

        /**Requete ok - succes de la demande */
        commit('setFlashMessageMut', { error: false, message: `enregistrement réussi pour votre lien ${data.mediaName}`});  
    },

    async getAllLink({dispatch}){
        /** endpoint de la requete*/
        const endPoint = utils.linkApi.getAllLink.endPoint;

        /** methode de la requete */
        const method = utils.linkApi.getAllLink.method;

        const getAllLink = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method });
        
        /** si pas de données */
        if(!getAllLink){
            return null;
        }

        return getAllLink;
    },

    async deleteLinkByUserId({dispatch, commit, getters}, data){ 
        /** id utilisateur */
        const userId = getters.getUserIdent.id;

        /** endpoint de la requete*/
        const endPoint = utils.linkApi.deleteLinkByUserId.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.linkApi.deleteLinkByUserId.method;

        const deleteLink = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

        if(!deleteLink){
            return null;
        }

        /**
         * mise a jour du profil utilisateur
         */
        commit('setUserProfilData', deleteLink);

        /**Requete ok - succes de la demande */
        commit('setFlashMessageMut', { error: false, message: `suppréssion réussie pour votre lien ${data.mediaName}`});  
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
