import utils from '../../helper/utils';

const state = {
    lessonsState: []        
};

const getters = {  
    lessonsStateGet: (state)=>state.lessonsState,  
};

const actions = {
    /**
     * Chargement de toute les leçons
     * @param {Object} dispatch - action
     * @param {Object} commit - muttation 
     * @returns 
     */    
    async getLessons({dispatch, commit}){
        /**requete pour la récupération des leçons*/
        const urlData = utils.lessonApi.getAllLesson;
        const lessons = await dispatch('actionHandler', {action: 'fetchAction', endPoint: urlData.endPoint, fetchMethod: urlData.method});
        
        /**Requete ok - succes de la demande */
        if(!lessons.error){     
            commit('setlessonsStateMut', lessons);
        }
        return lessons;
    }
};

const mutations = {
    setlessonsStateMut: (state, value) => (state.lessonsState = value)
};

export default {
    state,
    getters,
    actions,
    mutations
};
