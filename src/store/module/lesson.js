import utils from '../../helper/utils';
import router from '../../router';
import MarkdownHandler from '../../helper/markdown/markdownConverter';
import user from './user';

const state = {
    /** données completes d'une lecon en ecriture ou en lecture */
    editor: {},

    /**  */
    deleteLesson: {},

    /** liste de toutes les leçons disponibles */
    lessonList: [],

    /** liste de lecons utilisateur */
    userLesson: []
};

/**
 * Renvoie du state
 */
const getters = {
    /** recuperation lecon en édition ou lecture */
    getLessonEditor: (state)=>state.editor,

    /** recuperation de la liste de leçon */
    getLessonList: (state)=>state.lessonList,

    /** recuperation lecon a supprimer */
    getDeleteLesson: (state)=>state.deleteLesson,

    /** recuperation lecons utilisateur */
    getUserLesson: (state)=> state.userLesson,
};

const actions = {

    /** recuperation par slug d'un lecon
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.commit - mutation
     * @param {Object} data - données pour la requete axios
     * @property {string} data.slug - slug de la lecon
     * @returns {Object} lesson
     */
    async getLessonBySlug({dispatch, commit}, data){
        /** suppression des données dans le store */      
        commit('setLesson', {});    

        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.getLessonBySlug.endPoint.replace(':slug', data.slug);

        /** methode de la requete */
        const method = utils.lessonApi.getLessonBySlug.method;

        const getLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method });      
        
        /**si pas de reponse */
        if(!getLesson){
            return router.push({name: '404'});
        }

        /** Markdown pour le html */
        const markdownHandler = new MarkdownHandler();

        /**Requete ok */
        commit('setLesson', { 
            id: getLesson.id,
            title: getLesson.title,
            markdownText: getLesson.content,
            htmlOutput: markdownHandler.getHtml(getLesson.content),
            isSave: true,
            tags: getLesson.tags,
            autor: getLesson.autor,
            autorLinks: getLesson.links,
            avatarKey: getLesson.avatarKey,
            created: getLesson.created,
            updated: getLesson.updated,
            lessonImageUrl: getLesson.lessonImageUrl,
            adminRequest: getLesson.adminRequest,
            slug: getLesson.slug
        });
    },

    /**
     * récuperation d'une lecon par son id
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async getLessonById({dispatch, getters, commit}, data){   
        /** id de l'utilisateur */     
        const lessonId = data.lessonId;

        /** suppression des données dans le store */      
        commit('setLesson', {});    

        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.getLessonById.endPoint.replace(':id', lessonId);

        /** methode de la requete */
        const method = utils.lessonApi.getLessonById.method;

        const getLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method, formData: data.formData});      
        
        /**si pas de reponse */
        if(!getLesson){
            return;
        }
        
        /** Markdown pour le html */
        const markdownHandler = new MarkdownHandler();
        
        /**Requete ok */
        commit('setLesson', {            
            id: lessonId,
            title: getLesson.title,
            markdownText: getLesson.content,
            htmlOutput: markdownHandler.getHtml(getLesson.content),
            isSave: true,
            thematic: getLesson.thematic,
            summary: getLesson.summary,
            tags: getLesson.tags,
            autor: getLesson.autor,
            autorLinks: getLesson.links,
            avatarKey: getLesson.avatarKey,
            created: getLesson.created,
            updated: getLesson.updated,
            lessonImageUrl: getLesson.lessonImageUrl,
            token: getLesson.token,
            slug: getLesson.slug
        });   

        /** update de la liste des tags */        
        const tags = getters.getLessonEditor.tags;
        commit('setSelectionTag', tags);     
        router.push({name: 'UpdateLesson', params: {slug: getLesson.slug}});         
    },
    
    /**
     * création d'une lecon
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async createLesson({dispatch, getters, commit}, data){        
        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.createLesson.endPoint;
        
        /** methode de la requete */
        const method = utils.lessonApi.createLesson.method;        
        
        const createLesson = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method, formData: data.formData });

        /** Si pas d'erreur lors de la requête*/
        if(!createLesson){    
            return;
        }   

        /** Markdown pour le html */
        const markdownHandler = new MarkdownHandler();
        
        /**Requete ok */
        commit('setLesson', {            
            id: createLesson.id,
            title: createLesson.title,
            markdownText: createLesson.content,
            htmlOutput: markdownHandler.getHtml(createLesson.content),
            isSave: true,
            tags: createLesson.tags,
            autor: createLesson.autor,
            autorLinks: createLesson.links,
            avatarKey: createLesson.avatarKey,
            created: createLesson.created,
            updated: createLesson.updated,
            token: createLesson.token,
        });              
        commit('setFlashMessageMut', { error: false, message: 'enregistrement ok'});
        
        return createLesson;  
    },

    /**
     * modification d'une lecon par son id
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async updateLessonById({dispatch, getters, commit}, data){
        /** id de la lecon*/
        const lessonId = getters.getLessonEditor.id;

        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.updateLessonById.endPoint.replace(':id', lessonId);
        
        /** methode de la requete */
        const method = utils.lessonApi.updateLessonById.method;

        const updateLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method, formData: data.formData});

        /** Si pas d'erreur lors de la requête*/
        if(!updateLesson){    
            return;
        }    
         
        /** Markdown pour le html */
        const markdownHandler = new MarkdownHandler();       
        
        /**Requete ok */
        commit('setLesson', {            
            id: updateLesson.id,
            title: updateLesson.title,
            markdownText: updateLesson.content,
            htmlOutput: markdownHandler.getHtml(updateLesson.content),
            isSave: true,
            tags: updateLesson.tags,
            autor: updateLesson.autor,
            autorLinks: updateLesson.links,
            avatarKey: updateLesson.avatarKey,
            created: updateLesson.created,
            updated: updateLesson.updated,
            token: updateLesson.token,
            summary: updateLesson.summary,
            thematic: updateLesson.thematic
        });            

        commit('setFlashMessageMut', { error: false, message: 'enregistrement ok'});
        
        return updateLesson;  
    },

    /**
     * suppresion d'un lecon par son id
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async deleteLessonById({dispatch, getters, commit}, data){  
        /** id de la lecon a supprimer */            
        const lessonId = getters.getDeleteLesson.lessonId;

        /** si pas de lecon */
        if(!lessonId){
            return null;
        }

        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.deleteLessonById.endPoint.replace(':id', lessonId);
        
        /** methode de la requete */
        const method = utils.lessonApi.deleteLessonById.method;

        const deleteLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method, formData: data.formData});       
      
        if(!deleteLesson){
            return null;           
        } 
        commit('setDeleteLesson', {});
        commit('setFlashMessageMut', { error: false, message: 'la leçon est bien supprimée'});

        /**mise a jour des lecon */
        return await dispatch('actionHandler', {action: 'getLessonByUserId'});
    },

    /**
     * Annulation de la supprssion d'une lecon
     * @param {Object} param
     * @property {Object} param.commit - muttation du state
     */
    cancelDeleteLesson({commit}){
        commit('setDeleteLesson', {});
    },

    /**
     * récuperation de toute les lecons
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async getAllLesson({dispatch, getters, commit}, data){ 
        /**requete pour la récupération des leçons*/
        const endPoint = utils.lessonApi.getAllLesson.endPoint;

        /** method */
        const method = utils.lessonApi.getAllLesson.method;

        const lessons = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method});
        
        /**erreur dansd la requete */
        if(!lessons){     
            return;
        }

        return lessons;   
    },

    /**
     * récuperation des lecons d'un utilisateur
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async getLessonByUserId({dispatch, getters, commit}, data){
        /** id utilisateur */
        const userId = getters.getUserIdent.id;

        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.getLessonByUser.endPoint.replace(':id', userId);
        
        /** methode de la requete */
        const method = utils.lessonApi.getLessonByUser.method;

        const lessons = await dispatch('actionHandler', { action: 'axiosFetchAction', endPoint, method});        

        if(!lessons){            
            return;
        }   
        
        commit('setUserLesson', lessons);
    },

    /**
     * Recupere une liste de lecons par tag
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @returns  {Object} lessons    */

    async getLessonByTag({dispatch, getters}){
        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.getLessonByTag.endPoint;
       
        /** methode de la requete */
        const method = utils.lessonApi.getLessonByTag.method;
        
        /** récupere les tags et  ne renvoi que les id des tags dans la requete */
        const tags = getters.getSelectedTags.map(tag =>{           
            return tag.id;            
        });

        const filterLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method, formData: {tags: tags}});

        return filterLesson;
    },

    async adminRequest({getters, dispatch, commit}, data){
        /** id de l'utilisateur */     
        const lessonId = getters.getLessonEditor.id;

        if(isNaN(lessonId)){
            throw new Error('identifiant de la leçon manquant');
        }
        
        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.adminRequest.endPoint.replace(':lessonId', lessonId);

        /** methode de la requete */
        const method = utils.lessonApi.adminRequest.method;

        const request = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method, formData: data.formData}); 
        
        if(!request){
            return;
        }

        if(request.request === true){
            return commit('setFlashMessageMut', { error: false, message: 'le signalement du contenu est enregistré'});
        } else {
            return commit('setFlashMessageMut', { error: false, message: 'annulation du signalement pour ce contenu'});
        }            
    },

    /**
     * modification du state isSave de la lecon
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - TRUE|FALSE - satatus de la lecon
     */
    lessonUpdateStatus({ commit }, data){        
        commit('setLessonSaveStatus', data);  
    },

    /**
     * Reset les données du store
     */
    resetLessonStoreParameter({commit}){
        /** suppression des données de la lesson */
        commit('setLesson', {});   

        /** reset liste des tags proposés */
        commit('setProposalTag', []);

        /** reset liste des tags selectionnés */
        commit('setSelectionTag', []);
    }
};

const mutations = { 

    /** mise a jour lecon utilisateur */
    setUserLesson: (state, userLesson)=>(state.userLesson = userLesson),

    /** creation - update - ouverture d'une lecon en ecriture */
    setLesson: (state, lessonData)=>(state.editor = lessonData),    

    /** modif status sauvegarde */
    setLessonSaveStatus: (state, saveStatus)=>(state.editor.isSave = saveStatus),  

    /** text format markdown */
    setLessonMarkdownText: (state, markdownText)=>(state.editor.markdownText = markdownText),  

    /** modif titre */
    setLessonTitle: (state, lessonTitle)=>(state.editor.title = lessonTitle), 

    /** contenu html  */
    setLessonInHtml: (state, html) =>(state.editor.htmlOutput = html),

    /** modif liste des tags */
    setLessonTags: (state, tags) =>(state.editor.tags = tags),

    /** token formulaire édition d'une lecon */
    setTokenLesson: (state, token)=>(state.editor.token = token),

    /** liste de toutes les lecons */
    setLessonList: (state, lessons)=>(state.lessonList = lessons),

    /** modification state complet lecon a supprimer */
    setDeleteLesson: (state, deleteLesson)=>(state.deleteLesson = deleteLesson),

    /** modification id lecon a supprimer */
    setDeleteLessonId: (state, lessonId)=>(state.deleteLesson.lessonId = lessonId),

    /** modification token lecon a supprimer */
    setDeleteLessonToken: (state, tokenDeleteLesson)=>(state.deleteLesson.token = tokenDeleteLesson)
};

export default {
    state,
    getters,
    actions,
    mutations
};