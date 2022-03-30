/**données API et url des pages*/
import utils from '../../helper/utils';
import router from '../../router';

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
        console.log(imageUrl);

        if(!imageUrl.mediaRequest.picture_name || !imageUrl.pathUrl){
            throw new Error('echec recuperation des images médias');
        }

        console.log(imageUrl);

        return imageUrl.pathUrl + imageUrl.mediaRequest.picture_name;
    },

    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     */
    async saveLinkMedia({dispatch, getters}, data){
        /** id utilisateur */
        const userId = getters.getUserIdent.id;

        /** endpoint de la requete*/
        const endPoint = utils.linkApi.saveLinkByUserId.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.linkApi.saveLinkByUserId.method;
        const saveLinkMedia = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });
        console.log(saveLinkMedia)
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
