/**
 * bouton leçon, affiche soit:
 * une leçon en lecture 
 * une leçon en écriture
*/
import MarkdownHandler from '../../helper/markdown/markdownConverter';
import utils from '../../helper/utils';
import router from '../../router';
const state = { 
};

/**
 * Renvoie du state
 */
const getters = { 
};

const actions = {
    /**
     * ouverture d'une leçon en écriture
     * @param {Object} dispatch - action 
     * @param {Object} payload.data - contient les données d'une leçon a charger
     * @property {Number} payload.data.id - id de la leçon
     * @property {string} payload.data.slug - slug de la leçon
     */
    async editLesson({dispatch, commit}, payload){  
        const lessonId = payload.data.id;
        const slug = payload.data.slug;   
        /**chargement des élements de la lecon */            
        const lesson = await dispatch('actionHandler', {action: 'loadLessonAction', lessonId: lessonId});

        /** Erreur dans la réponse */
        if(!lesson || lesson.error){
            return commit('setFlashMessageMut', { error: true, message: 'erreur lors de la récuperation de la leçon'});
        }

        /** Markdown pour le html */
        const markdownHandler = new MarkdownHandler();
    
        /**mise a jour des states */
        commit('setTitleMut', lesson.title);
        commit('setLessonIdMut', lessonId);
        commit('setMarkdownContentMut', lesson.content);
        commit('setHtmlContentMut', markdownHandler.getHtml(lesson.content));
        commit('lessonSelectionTagMut', lesson.tags);

        /**Affichage de l'éditeur markdown */
        router.push({name: 'UpdateLesson', params: {slug: slug}});
    },

    /**
     * Ouverture d'une leçon en lecture
     * @param {Object} dispatch - action 
     * @param {Object} payload.data - contient les données d'une leçon a charger
     * @property {Number} payload.data.id - id de la leçon
     * @property {string} payload.data.slug - slug de la leçon
     */
    async readLesson({dispatch, commit}, payload){
        const lessonId = payload.data.id;
        const slug = payload.data.slug;   
        /**chargement des élements de la lecon */ 
        const lesson = await dispatch('actionHandler', {action: 'loadLessonAction', lessonId: lessonId});
        
        /** Erreur dans la réponse */
        if(!lesson || lesson.error){
            return commit('setFlashMessageMut', { error: true, message: 'erreur lors de la récuperation de la leçon'});
        }

        /** chargement des données*/
        commit('setLessonStateMut', lesson);

        /**Affichage de l'éditeur markdown */
        router.push({name: 'ReadLesson', params: {slug: slug}});
    },
    
    /**
     * récuperation des données d'une lecon a partir de son id
     * @param {Object} dispatch - action
     * @property {Object} commit - mutation
     * @property {Number} lessonId - id de la lecon a charger
     */
    async loadLessonAction({dispatch, commit}, lessonData){
        const lessonId = lessonData.lessonId;
        /**reset des states */
        await dispatch('actionHandler', {action: 'resetLessonAction'});
        const urlData = utils.lessonApi.getLessonById;
        /**Requête update leçon */  
        const loadLesson = await dispatch('actionHandler', {action: 'fetchAction', endPoint: urlData.endPoint.replace(':id', lessonId), fetchMethod: urlData.method});
               
        /** Erreur dans la réponse */
        if(!loadLesson || loadLesson.error){
            return commit('setFlashMessageMut', { error: true, message: 'erreur lors de la récuperation de la leçon'});
        }
        return loadLesson;       
    },
};

const mutations = {
};

export default {
    state,
    getters,
    actions,
    mutations
};
