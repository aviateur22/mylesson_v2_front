import utils from '../../helper/utils';
import router from '../../router';
import MarkdownHandler from '../../helper/markdown/markdownConverter';

const state = {
    lesson: {
        /**données d'une lecon en ecriture */
        editor: {}
    },
};

/**
 * Renvoie du state
 */
const getters = {
    /** recuperation lecon en édition */
    getLessonEditor: (state)=>state.lesson,
};

const actions = {

    /**
     * récuperation d'une lecon par son id
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données pour la requete axios
     * @returns {Object} lesson
     */
    async getLessonById({dispatch, getters, commit}, data){   
        /** id de la lecon */     
        const lessonId = data.lessonId;   

        /** suppression des données dans le store */      
        commit('setLesson', {});    

        /** endpoint de la requete*/
        const endPoint = utils.lessonApi.getLessonById.endPoint.replace(':id', lessonId);

        /** methode de la requete */
        const method = utils.lessonApi.getLessonById.method;

        const getLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method });      
        
        /**si pas de reponse */
        if(!getLesson){
            return;
        }

        /** Markdown pour le html */
        const markdownHandler = new MarkdownHandler();
        console.log(getLesson);
        /**Requete ok */
        commit('setLesson', {            
            id: lessonId,
            title: getLesson.title,
            markdownText: getLesson.content,
            htmlOutput: markdownHandler.getHtml(getLesson.content),
            isSave: true,
            tags: getLesson.tags
        });   
        /** ouverture de la lecon en écriture */
        if(data.editLesson){  
            /** récupération des tags de la lecon */
            const tags = getters.getLessonEditor.editor.tags;

            /** update de la liste des tags */  
            commit('setSelectionTag', tags);

            router.push({name: 'UpdateLesson', params: {slug: getLesson.slug}});
        } else {
            /** 
            * ouverture de la lecon en écriture 
            */
            router.push({name: 'ReadLesson', params: {slug: getLesson.slug}});
        }     
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
        
        const createLesson = await dispatch('actionHandler', {action: 'axiosFetchAction', endPoint, method, formData: data.formData });

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
            tags: [],
            isSave: true
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
        const lessonId = getters.getLessonEditor.editor.id;

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
            markdownText: updateLesson.content,
            htmlOutput: markdownHandler.getHtml(updateLesson.content),
            title: updateLesson.title,
            isSave: true,
            tags: updateLesson.tags
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
    },

    /**
     * Ajout d'un tag à la lecon
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données du tag a ajouter
     */
    async lessonAddTag({getters, commit}, data){        
        commit('setLessonSaveStatus', false);  
    },

    /**
     * suppression d'un tag
     * @property {Objec} param.dispatch - action
     * @property {Objec} param.getters - getter
     * @property {Objec} param.commit - mutation
     * @param {data} [data] - données du tag a ajouter
     */
    async lessonDeleteTag({getters, commit}, data){
        commit('setLessonSaveStatus', false);  
    }
};

const mutations = { 
    /** creation - update - ouverture d'une lecon en ecriture */
    setLesson: (state, lessonData)=>(state.lesson.editor = lessonData),    

    /** modif status sauvegarde */
    setLessonSaveStatus: (state, saveStatus)=>(state.lesson.editor.isSave = saveStatus),  

    /** text format markdown */
    setLessonMarkdownText: (state, markdownText)=>(state.lesson.editor.markdownText = markdownText),  

    /** modif titre */
    setLessonTitle: (state, lessonTitle)=>(state.lesson.editor.title = lessonTitle), 

    /** contenu html  */
    setLessonInHtml: (state, html) =>(state.lesson.editor.htmlOutput = html),

    /** modif liste des tags */
    setLessonTags: (state, tags) =>(state.lesson.editor.tags = tags),
};

export default {
    state,
    getters,
    actions,
    mutations
};