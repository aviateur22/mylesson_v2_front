/**données API et url des pages*/
import utils from '../../helper/utils';

const state = {   
    //liste de lesson créée par un utilisateur 
    userLessonState: [],
};

/**
 * Renvoie du state
 */
const getters = {
    userLessonStateGet: (state)=>state.userLessonState,    
};

const actions = {
    /**
     * Récupération de toutes les leçons créées par un utilisateur
     * @property {Object} param.dispatch - action
     * @property {Object} param.commit - mutation
     * @property {Object} dataObject.endPoint - route pour la requête
     * @property {string} dataObject.fetchMethod - méthode de la requête    
     * @returns {Object} [null|commit]
     */
    async getLessonsAction({commit, dispatch, getters}){
        /**récuperation des lessons d'un utilisateur */
        const urlData = utils.lessonApi.getLessonByUser;
        const lessons = await dispatch('actionHandler', { action: 'fetchAction', endPoint: urlData.endPoint.replace(':id', getters.userIdentGet.id), fetchMethod: urlData.method});        
        if(!lessons || lessons?.error){            
            return;
        }                       
        return commit('setUserLessonsMut', lessons);           
    }
};

const mutations = {
    /** update state  */
    setUserLessonsMut: (state, lessons) => (state.userLessonState = lessons),
};

export default {
    state,
    getters,
    actions,
    mutations
};
