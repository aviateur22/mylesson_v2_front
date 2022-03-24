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
    async signupAction({dispatch, commit}, data){
        /** endpoint de la requete*/
        const endPoint = utils.userApi.register.endPoint;

        /** methode de la requete */
        const method = utils.userApi.register.method;

        const signupResult = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });        
        
        /** echec de la requete */
        if(!signupResult){
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
    async loginAction({commit, dispatch}, data){
        /** endpoint de la requete*/
        const endPoint = utils.userApi.login.endPoint;

        /** methode de la requete */
        const method = utils.userApi.login.method;

        const loginResult = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });  

        /** echec de la requete */
        if(!loginResult){
            return;
        }

        /**Requete ok - succes de la demande */
        commit('setUserIdentMut', { userAuthenticated: true, roleId: loginResult.role, id: loginResult.id, email: loginResult.email});            
        commit('setFlashMessageMut', { error: false, message: `Bienvenue ${loginResult.message}`});
        
        return router.push({name: 'UserHomeAccount'});           
    },

    /**
     * récuperation des donées utilisateurs
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getter
     * @returns {object} requestedUser
     */
    async getUserInformation({ dispatch, getters}){
        /** id utilisateur */
        const userId = getters.userIdentGet.id;
        
        /** id utilisateur manuqant */
        if(!userId){
            throw new Error('identifiant utilisateur manquant');
        }        

        /** id utilsateur faux */
        if(isNaN(userId, 10)){
            throw new Error('identifiant utilisateur incorrect');
        }

        /** endpoint de la requete*/
        const endPoint = utils.userApi.getUserById.endPoint.replace(':id', userId);

        /** methode de la requete */
        const method = utils.userApi.getUserById.method;
        
        const getUserById = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });

        /**echec de la requête */
        if(!getUserById){
            return;
        }

        return getUserById;
    },

    /**
     * mise a jour des donées utilisateurs
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getter
     * @property {Object} param.commit - mutation
     * @param {HTMLElement} data.form - formulaire de modification
     * @returns {object} updatedUser
     */
    async updateUserInformation({dispatch, getters, commit}, data){
        /** id de l'utilisateur */
        const userId = getters.userIdentGet.id;

        /** id utilisateur manuqant */
        if(!userId){
            throw new Error('identifiant utilisateur manquant');
        }        

        /** id utilsateur faux */
        if(isNaN(userId, 10)){
            throw new Error('identifiant utilisateur incorrect');
        }

        /** endpoint de la requete*/
        const endPoint = utils.userApi.updateUserById.endPoint.replace(':id', userId);

        /** methode de la requete */
        const method = utils.userApi.updateUserById.method;

        const updateUser = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

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
    async logoutAction({dispatch}) {     
        /** endpoint de la requete*/
        const endPoint = utils.userApi.logout.endPoint;

        /** methode de la requete */
        const method = utils.userApi.logout.method;

        const logoutResult = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });

        /**echec de la requête */
        if(!logoutResult){
            return;
        }
        /**Requete ok - succes de la demande */
        dispatch('resetUserAuth', { pathName: utils.apiDataUrl.homePage.pathName, message: 'a bientôt'});       
    },

    /**
     * Reset des données utilisateur 
     * @property {Object} param.commit - mutattion
     * @property {object} param.dispatch - action
     * @property {String} data.message - message a envoyer a l'utilisateur
     * @property {String} data.pathName - redirection url
     * @property {Boolean} data.isError - couleur rouge si true | vert si false
     */
    resetUserAuth({commit, dispatch}, data){
        try {
            /** message a afficher */
            const message = data.message;        
            
            /** redirection */
            const pathName = data.pathName;

            /** isError === true -> red -- isError === false -> grreen  */
            let isError = data.error;
            if(!isError){
                isError = false;
            }
            //Reset de tous les states
            commit('setUserIdentMut', {});           
            commit('setUserLessonsMut', []);
            dispatch('resetLessonAction');
            commit('setFlashMessageMut', { visibility: true, error: isError, message: message});           
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
