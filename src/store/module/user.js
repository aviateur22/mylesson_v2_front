/**données API et url des pages*/
import utils from '../../helper/utils';

import router from '../../router';

const state = {        
    //données utilisateur après connexion
    userIdentState: {},
};

const getters = {    
    userIdentGet: (state)=>state.userIdentState
};

const actions = {    
    async setUserIdentAct({commit}, userIdentState){
        /**Appel mutation du state userAuthenticated */
        commit('setuserIdentMut', userIdentState);
    },

    /**
     * Inscription utilisateur    
     * @param {Object} dispatch - action
     * @property {htmlElement} dataObject.form - formulaire
     * @property {string} dataObject.endPoint - end point requête     
     * @returns {Object} [null|pageHtml] - resultat de la requete
     */
    async signupAction({dispatch, commit}, dataObject){        
        const signupResult = await dispatch('actionHandler', { action: 'fetchAction', endPoint: dataObject.endPoint, form: dataObject.form });
        
        /**echec de la requête */
        if(!signupResult || signupResult.error){
            return;
        }
        /**Requete ok - succes de la demande */
        commit('setFlashMessageMut', { error: false, message: 'Bravo, c\'est une réussite, tu peux maintent te connecter'});      
        return router.push({name: 'Login'});
    },

    /**
     * Connexion utilisateur 
     * @param {Object} commit - mutation
     * @param {Object} dispatch - action
     * @property {htmlElement} dataObject.form - formulaire
     * @property {string} dataObject.endPoint - end point requête
     * @property {string} [dataObject.fetchMethod] - methode requête    
     * @returns {Object} [null|pageHtml] - resultat de la requete
     */
    async loginAction({commit, dispatch}, dataObject){
        const loginResult = await dispatch('actionHandler', { action: 'fetchAction', endPoint: dataObject.endPoint, form: dataObject.form});
        
        /**echec de la requête */
        if(!loginResult || loginResult.error){
            return;
        }

        /**Requete ok - succes de la demande */
        commit('setUserIdentMut', { userAuthenticated: true, roleId: loginResult.role, id: loginResult.id, email: loginResult.email});            
        commit('setFlashMessageMut', { error: false, message: `Bienvenue ${loginResult.message}`});
        
        return router.push({name: 'UserHomeAccount'});           
    },

    async getUserInformation({commit, dispatch, getters}, dataObject){
        /** données API  */
        const urlData = utils.userApi.getUserById;

        const userId = getters.userIdentGet.id;

        if(!userId){
            throw new Error('identifiant utilisateur manquant');
        }

        if(isNaN(userId, 10)){
            throw new Error('identifiant utilisateur incorrect');
        }
       
        const getUserById = await dispatch('actionHandler', { action: 'fetchAction', endPoint: urlData.endPoint.replace(':id', getters.userIdentGet.id), fetchMethod: urlData.method});
        
        /**echec de la requête */
        if(!getUserById || getUserById.error){
            return;
        }
        return getUserById;
    },

    async updateUserInformation({dispatch, getters, commit}, data){
        /** données API  */
        const urlData = utils.userApi.updateUserById;

        /** id de l'utilisateur */
        const userId = getters.userIdentGet.id;

        if(!userId){
            throw new Error('identifiant utilisateur manquant');
        }

        if(isNaN(userId, 10)){
            throw new Error('identifiant utilisateur incorrect');
        }

        const updateUser = await dispatch('actionHandler', { action: 'fetchAction', endPoint: urlData.endPoint.replace(':id', getters.userIdentGet.id), fetchMethod: urlData.method, form: data.form});

        /**echec de la requête */
        if(!updateUser || updateUser.error){
            return;
        }

        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: 'modification du compte effectuée'});

        return updateUser;
    },

    /*
     * Deconnexion
     */
    async logoutAction({dispatch}, router) {     
        try {
            const logoutResult = await dispatch('fetchAction', { endPoint: utils.apiDataUrl.logoutAction, fetchMethod: 'get'});

            /**echec de la requête */
            if(!logoutResult){
                return;
            }
            /**Requete ok - succes de la demande */
            dispatch('resetUserAuth', { router: router, pathName: utils.apiDataUrl.homePage.pathName, message: 'a bientôt'});            
        } catch (error) {
            console.log(error);  
        }
    },

    /**
     * 
     * @param {*} param0 
     * @param {*} dataObject 
     */
    resetUserAuth({commit, dispatch}, dataObject){
        try {
            const message = dataObject.message;            
            const pathName = dataObject.pathName;
            //Reset de tous les states
            commit('setUserIdentMut', {});           
            commit('setUserLessonsMut', []);
            dispatch('resetLessonAction');
            commit('setFlashMessageMut', { visibility: true, error: false, message: message});           
            router.push({name: pathName });            
        } catch (error) {
            console.log(error);   
        }       
    },
};

const mutations = {
    /**
     * Update du userAuthenticated state
     */
    setUserIdentMut: (state, userIdentState)=>(state.userIdentState = userIdentState)
};

export default {
    state,
    getters,
    actions,
    mutations
};