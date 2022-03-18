//import router from './../router'
/**
 * Donnée API
 */
const utils = {
    baseUri: 'http://localhost:3000',
    /**
     * config url de l'application
     */
    apiDataUrl: {
        homePage: {url: '/', pathName: 'HomePage'},
        loginPage: '/login',
        signupPage: '/signup',
        resetPasswordPage: '/reset-password',
        homeAccountPage: '/users/auth/home',
        deleteAccountPage: '/users/auth/delete-account',
        infoPage: '/users/auth/account',
        /**
         * page listant les leçon d'un utilisateur
         */
        userLessonPage: {url: '/users/auth/lesson', pathName: 'userLessonPage'}, 

        /**
         * type de leçon a ajouter (markdown ou downloadfile)
         */
        addLessonTypePage: {url: '/users/auth/editor/lesson-type-selection', pathName: 'AddLessonSelection'},

        /**
         * page d'édition d'une lecon markdown
         */
        addMarkdownLessonPage: {url: '/users/auth/editor/add/lesson-markdown', pathName: 'AddMarkdownLesson'},

        /**
         * page d'update d'une leçon existante
         */
        updateLessonPage: {url: '/users/auth/editor/update/markdown-lesson/:slug', pathName: 'UpdateLesson'},

        /**
         * page de lecture d'une leçon
         */
        readLessonPage: {url: '/lesson/:slug', pathName: 'ReadLesson'},

        uploadFilePage: '/users/auth/editor/upload/lesson-file',
        updateUserRolePage: '/users/auth/admin/update-user-role',
        resetDatabasePage: '/users/auth/super-admin/reset-database',

        /**Gestion requete API */
        base_uri: '/gh',
        logoutAction: '/users/logout',
        userLoginAction: '/users/login',
        userSignupAction: '/users/signup',
        userGetInfoAction: '/users/auth/id',        
        userUpdateInfoAction: '/users/auth/id',
        userDeleteAccountAction: '/users/auth/id',
        /**Recuperation de toutes les leçons */
        userGetAllLessonAction: '/lessons',
        /**Recuperation leçons d'un utilisateur */
        userGetLessonAction: '/lessons/auth/user/user-lesson',
        /**création d'une leçon */
        createLessonAction: '/lessons/auth',
        /**uploiad d'un fichier markdown */
        uploadLessonAction: '/lessons/auth',
        /**récuperation d'une leçon exisante */
        getLessonAction: '/lessons/auth/:id',   
        /**mise a jour d'une lecon */    
        updateLessonAction: '/lessons/auth/:id',
        /**suppression d'une leçon */
        removeLessonAction: '/lessons/auth/id',
        findTag: '/lessons/auth/tags'
    }
};
export default utils;