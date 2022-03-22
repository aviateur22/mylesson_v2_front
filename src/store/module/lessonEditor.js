import utils from '../../helper/utils';
import router from '../../router'

const state = {
    //leçon id
    lessonIdState: '',

    //sortie format html
    htmlContentState: '',

    //input utilisateur markdown  
    markdownContentState: '',

    //titre lecon
    titleState: '',

    //contenu modifié et pas sauvegardé
    lessonSaveState: false
};

/**
 * Renvoie du state
 */
const getters = {    
    //acces state de sauvegarde lecon
    lessonSaveStateGet: (state)=>state.lessonSaveState,

    //id leçon
    lessonIdStateGet: (state)=>state.lessonIdState,

    //titre lecon
    titleStateGet: (state)=>state.titleState,

    //content markdown
    markdownContentStateGet: (state)=>state.markdownContentState,

    //sortie html
    htmlContentStateGet: (state)=>state.htmlContentState,
};

const actions = {
    /**
     * Reset lessonState et SelectionTagState 
     * @param {Object} commit - mutation 
     * @property {Object} dataObject.router
     * @returns 
     */
    lessonCreation({dispatch}){        
        //reset des parametres  
        dispatch('resetLessonAction');
        return router.push({name: utils.apiDataUrl.addMarkdownLessonPage.pathName});  
    },

    /**
     * Dispatcher entre updateLessonAction et createLessonAction 
     * @property {Object} param.dispatch - dispacther
     * @property {Object} param.commit - mutation
     * @property {Object} param.getters - getters
     * @property {htmlElement} form - formulaire html de la leçon   
     * @returns 
     */
    async lessonRegisterAction({commit, dispatch, getters}, payload){
        /**Formulaire html */
        const form = payload.formElement;

        /**si  lessonSaveState === false*/
        if(!getters.lessonSaveStateGet){
            /**id de la leçon */     
            const lessonId = parseInt(getters.lessonIdStateGet, 10);

            /**Verification format lessonId */
            if(lessonId && isNaN(lessonId)){
                commit('setFlashMessageMut', { error: true, message: 'format lessonId invalide' });
                return {error: true};
            }  

            //verification des tag, titre et contenu non vide avant soumission du formulaire
            if(!getters.titleStateGet || !getters.markdownContentStateGet || !getters.lessonSelectionTagGet.length > 0){
                commit('setFlashMessageMut', { error: true, message: 'les tag(s), titre et contenu doivent être renseignés'});
                return {error: true};
            }
            /**Dispatcher */
            return lessonId
                ? await dispatch('actionHandler', { action: 'updateLessonAction', formElement: form })
                : await dispatch('actionHandler', { action: 'createLessonAction', formElement: form });        
        }        
    },

    /**
     * Création d'un leçon en base de donnée
     * @property {Object} param - object 
     * @property {Object} param.commit - mutation
     * @property {Object} param.getters - getters
     * @param {Object} lessonForm - leçon formulaire 
     * @returns 
     */
    async createLessonAction({dispatch, commit}, payload){
        /**Formulaire html */
        const lessonForm = payload.formElement;

        /**requete pour creation leçon  et récupération de l'id*/
        const urlData = utils.lessonApi.createLesson;

        const createLessonResult = await dispatch('actionHandler', {action: 'fetchAction', form: lessonForm, endPoint: urlData.endPoint});

        /** Si pas d'erreur lors de la requête*/
        if(!createLessonResult.error){
            /**Requete ok - succes de la demande */
            commit('setLessonIdMut', createLessonResult.id);                
            commit('setFlashMessageMut', { error: false, message: 'enregistrement ok'});
            //passe le status  de sauvegarde à false
            commit('setLessonSaveMut', true);            
        }         
        
        return createLessonResult;
    },

    /**
     * Mise à jour d'une leçon
     * @property {Object} param - object 
     * @property {object} param.commit - mutation
     * @property {object} param.getters - getters
     * @param {Object} lessonForm - leçon formulaire 
     * @returns 
     */
    async updateLessonAction({commit, dispatch, getters}, payload){
        /**Formulaire html */
        const lessonForm = payload.formElement;

        /**id lesson inconnu */
        const lessonId = getters.lessonIdStateGet;       
                
        if(!lessonId){     
            return commit('setFlashMessageMut', { error: true, message: 'id leçon indéfinie' });
        }

        /**requete mise a jour d'une lecon*/
        const urlData = utils.lessonApi.updateLessonById;

        /**Requête update leçon */            
        const updateLessonResult = await dispatch('actionHandler', 
            {
                action: 'fetchAction',
                form: lessonForm,
                endPoint: urlData.endPoint.replace(':id', lessonId),
                userId: getters.userIdentGet.id,
                fetchMethod: urlData.method
            });

        /** Si pas d'erreur lors de la requête */
        if(!updateLessonResult.error){
            /**Requete ok - succes de la demande */               
            commit('setFlashMessageMut', { error: false, message: 'enregistrement ok'});
            //passe le status  de sauvegarde à false
            commit('setLessonSaveMut', true);           
        }
        return updateLessonResult;   
    },

    /**
     * Quitte l'édition d'une leçon sans enregistrement
     * @param {*} param0 
     * @param {*} payload 
     */
    leaveEditor({commit}, routerPathName){
        commit('setLessonSaveMut', true);
    },

    /**
     * Reset des parametre d'édition de la leçon
     * @param {Object} commit - mutation
     */
    resetLessonAction({commit}){
        try {
            //reset state leçon
            commit('setTitleMut', '');
            commit('setLessonIdMut', '');
            commit('setMarkdownContentMut', '');
            commit('setHtmlContentMut', '');
            commit('setLessonSaveMut', true);  
            //reset state tags
            commit('lessonSelectionTagMut', []);
            commit('lessonTagMut', []);
        } catch (error) {
            console.log(error);   
        }       
    }
};

const mutations = {    
    /**mutation du status de sauvegarde */
    setLessonSaveMut: (state, lessonSaveState)=>(state.lessonSaveState = lessonSaveState),

    /** mutation du titre */
    setTitleMut: (state, titleLesson)=>(state.titleState = titleLesson),

    /**modification id lecon */
    setLessonIdMut: (state, lessonId) => (state.lessonIdState = lessonId),
    
    /** modification markdownContent */
    setMarkdownContentMut: (state, content)=> (state.markdownContentState = content),

    /**modification sortie html */
    setHtmlContentMut: (state, htmlContent) => (state.htmlContentState = htmlContent),
};

export default {
    state,
    getters,
    actions,
    mutations
};
