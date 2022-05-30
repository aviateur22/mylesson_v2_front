/**données API et url des pages*/
import utils from '../../helper/utils';
import router from '../../router';

const state = {        
    //données utilisateur après connexion
    userIdentState: {},
    //donnée utilisateur page de profil
    userProfilData: {}
};

const getters = {    
    getUserIdent: (state)=>state.userIdentState,
    getUserProfilData: (state)=>state.userProfilData,
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
        
        /**génération token  */
        const token = await dispatch('actionHandler', {action: 'createToken', userId: loginResult.id});        

        /**pas de génération de token */
        if(!token.dataToken){
            return null;
        }

        const formData = new FormData();     

        /**token pour soumission */
        formData.append('token', token.dataToken.token);

        /**mise a jour des notification */
        await dispatch('actionHandler', { action: 'countNotificationUnreadByUserId', userId: loginResult.id, formData: Object.fromEntries(formData.entries()) });     

        /**Requete ok - succes de la demande */
        commit('setUserIdent', { userAuthenticated: true, roleId: loginResult.role, id: loginResult.id, login: loginResult.user });            
        commit('setFlashMessageMut', { error: false, message: `Bienvenue ${loginResult.message}`});
        
        return router.push({name: 'UserHomeAccount'});           
    },

    /**
     * récuperation des donées utilisateurs
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getter
     * @returns {object} requestedUser
     */
    async getUserInformation({ dispatch, getters, commit}){
        /** id utilisateur */
        const userId = getters.getUserIdent.id;
        
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

        /** mise a jour du store */
        commit('setUserProfilData', getUserById);
        return getUserById;
    },

    /**
     * récuperation de l'image utilisateur
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getter
     * @returns 
     */
    async getAvatarByKey({ dispatch, getters }, data){
        /** id utilisateur */
        const imageKey = data.key;
    
        /** id utilisateur manuqant */
        if(!imageKey){
            throw new Error('identifiant de l\'image incorrects');
        }        

        /** endpoint de la requete*/
        const endPoint = utils.userApi.getAvatarByKey.endPoint.replace(':key', imageKey);

        /** methode de la requete */
        const method = utils.userApi.getAvatarByKey.method;
        
        const uploadFile = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });        
    },

    /**
     * Mise a jour de l'image de profil
     * @property {Object} param.dispatch
     * @property {Object} param.getters
     * @property {Object} param.commit
     * @property {Object} data.formData - données a envoyées
     * @returns 
     */
    async updateImageByUserId({dispatch, commit, getters}, data){
        /** id utilisateur */
        const userId = getters.getUserIdent.id;

        /** endpoint de la requete*/
        const endPoint = utils.userApi.updateImageByUserId.endPoint.replace(':userId', userId);
       
        /** methode de la requete */
        const method = utils.userApi.updateImageByUserId.method;

        const updateUserImage = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData }); 

        /** echec de la requete */
        if(!updateUserImage){            
            return;
        }

        /**
         * mise a jour du profil utilisateur
         */
        commit('setUserProfilData', updateUserImage);

        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: 'modification de votre image de profile effectuée'});

        return updateUserImage;
    },

    /**
     * recuoeration image media Sociaux
     * @param {*} param0 
     * @param {*} data 
     */
    async getLinkMediaImageByName({dispatch}, data){
        /** nom du media  */
        const mediaName = data.mediaName;

        /** endpoint de la requete*/
        const endPoint = utils.userApi.getLinkMediaImageByName.endPoint.replace(':media', mediaName);

        /** methode de la requete */
        const method = utils.userApi.getLinkMediaImageByName.method;       

        const imageUrl = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method });

        return imageUrl;
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
        const userId = getters.getUserIdent.id;

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
        if(!updateUser){
            return;
        }

        /**
         * mise a jour du profil utilisateur
         */
        commit('setUserProfilData', updateUser);
        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: 'modification du compte effectuée'});

        return updateUser;
    },

    /**
     * mise a jour du mot de passe
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getter
     * @property {Object} param.commit - mutation
     * @param {HTMLElement} data.form - formulaire de modification
     * @returns {object} updatedPassword
     */
    async updateUserPassword({dispatch, getters, commit}, data){
        /** id de l'utilisateur */
        const userId = getters.getUserIdent.id;

        /** id utilisateur manuqant */
        if(!userId){
            throw new Error('identifiant utilisateur manquant');
        }        

        /** id utilsateur faux */
        if(isNaN(userId, 10)){
            throw new Error('identifiant utilisateur incorrect');
        }

        /** endpoint de la requete*/
        const endPoint = utils.userApi.updatePasswordById.endPoint.replace(':id', userId);

        /** methode de la requete */
        const method = utils.userApi.updatePasswordById.method;

        const updatePassword = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

        /** echec de la mise a jour */
        if(!updatePassword){
            return;
        }

        /**
         * mise a jour du profil utilisateur
         */
        commit('setUserProfilData', updatePassword);
        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: 'votre mot de passe est modifié'});
    },

    /**
     * demande pour pouvoir éditer du contenu
     * @property {Object} param.dispatch - action
     * @property {Object} param.getters - getter
     * @property {Object} param.commit - mutation
     * @param {Object} data 
     * @returns 
     */
    async requestUserUpgrade({getters, dispatch, commit}, data){
        /** id de l'utilisateur */
        const userId = getters.getUserIdent.id;

        /** id utilisateur manuqant */
        if(!userId){
            throw new Error('identifiant utilisateur manquant');
        }        

        /** id utilsateur faux */
        if(isNaN(userId, 10)){
            throw new Error('identifiant utilisateur incorrect');
        }

        /** endpoint de la requete*/
        const endPoint = utils.userApi.requestUpgradeUserRole.endPoint.replace(':userId', userId);

        /** methode de la requete */
        const method = utils.userApi.requestUpgradeUserRole.method;

        /** requete */
        const requestUserUpgrade = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

        /** echec de la mise a jour */
        if(!requestUserUpgrade){
            return;
        }

        /** Mise a jour des données */
        commit('setUserProfilData', requestUserUpgrade);

        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: 'vote demande est prise en compte'});
    },

    /**
     * envoie d'un email pour mot de passe perdu
     * @param {*} param0 
     */
    async sendEmailPasswordLost({dispatch, commit}, data){
        /** email de l'utilisateur */
        const email = data.email;

        /** id utilisateur manuqant */
        if(!email){
            /**emaul obligatoire */        
            return commit('setFlashMessageMut', { error: true, message: 'votre email est obligatoire'});
        }  

        /** endpoint de la requete*/
        const endPoint = utils.userApi.sendEmailPasswordLost.endPoint.replace(':email', email);

        /** methode de la requete */
        const method = utils.userApi.sendEmailPasswordLost.method;

        const sendEmail = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

        if(!sendEmail){
            return null;
        }
        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: 'un email vous a été envoyé'});
    },

    /**
     * reset du mot de passe 
     */
    async resetPasswordByUserId({dispatch, commit}, data){        
        /** endpoint de la requete*/
        const endPoint = utils.userApi.resetPasswordByUserId.endPoint.replace(':userId', data.userId);

        /** methode de la requete */
        const method = utils.userApi.resetPasswordByUserId.method;

        /** requête */
        const resetPassword = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

        if(!resetPassword){
            return null;
        }

        /**Requete ok - succes de la demande */        
        commit('setFlashMessageMut', { error: false, message: 'mot de passe changé avec succés'});

        router.push({name: 'Login'});
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
            commit('setUserIdent', {});
            commit('setNewNotification', 0);           
            commit('setLesson', {});
            commit('setUserProfilData', {});
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
    setUserIdent: (state, userIdentState)=>(state.userIdentState = userIdentState),

    /**
     * Mise a jour des données profiles 
     */
    setUserProfilData: (state, userData)=>(state.userProfilData = userData),
};

export default {
    state,
    getters,
    actions,
    mutations
};
