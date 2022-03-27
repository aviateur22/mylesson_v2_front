//import router from './../router'
/**
 * Donnée API
 */
const utils = {
    baseUri: 'http://localhost:3000/api',

    /** utilisateurs */
    userApi: {        
        login: { endPoint: '/users/login', method: 'post' },
        register: { endPoint: '/users', method: 'post' },
        logout: { endPoint: '/users/logout', method: 'post' },
        updatePasswordById: { endPoint: '/users/password/:id', method: 'patch' },
        getUserById: { endPoint: '/users/:id', method: 'get' },
        updateUserById: { endPoint: '/users/:id', method: 'patch' },
        deleteUserById: { endPoint: '/users/:id', method: 'delete' },
        getAllUser: { endPoint: '/users', method: 'get' },
        getAvatarByKey: {endPoint: '/users/image/:key', method: 'get'},
        getAutorAvatarByKey: {endPoint: '/users/image/autor/:key', method: 'get'}
    },
    /** lessons */
    lessonApi: {
        createLesson: { endPoint: '/lessons', method: 'post' },
        getLessonById: { endPoint: '/lessons/:id', method: 'get' },
        updateLessonById: { endPoint: '/lessons/:id', method: 'patch' },
        deleteLessonById: { endPoint: '/lessons/:id', method: 'delete' },
        getLessonByUser: { endPoint: '/lessons/user/:id', method: 'get' },
        getAllLesson: { endPoint: '/lessons', method: 'get' }
    },
    /**tags */
    tagApi: {
        findTagByName: { endPoint: '/tags/name/:name', method: 'get' },
        getTagById: { endPoint: '/tags/:id', method: 'get' },
        updateTagById: { endPoint: '/tags/:id', method: 'patch' },
        deleteTagById: { endPoint: '/tags/:id', method: 'delete' },
        addTag: { endPoint: '/tags', method: 'post' }

    },
    /**url page utilisateur */
    pageUserUrl: {

    },
    apiDataUrl: {
        homePage: {url: '/', pathName: 'HomePage'},
        loginPage: '/login',
        signupPage: '/signup',
        resetPasswordPage: '/reset-password',
        homeAccountPage: '/users/home',
        deleteAccountPage: '/users/delete-account',
        infoPage: '/users/account',
        /**
         * page listant les leçon d'un utilisateur
         */
        userLessonPage: {url: '/users/lesson', pathName: 'userLessonPage'}, 

        /**
         * type de leçon a ajouter (markdown ou downloadfile)
         */
        addLessonTypePage: {url: '/users/editor/lesson-type-selection', pathName: 'AddLessonSelection'},

        /**
         * page d'édition d'une lecon markdown
         */
        addMarkdownLessonPage: {url: '/users/editor/add/lesson-markdown', pathName: 'AddMarkdownLesson'},

        /**
         * page d'update d'une leçon existante
         */
        updateLessonPage: {url: '/users/editor/update/markdown-lesson/:slug', pathName: 'UpdateLesson'},

        /**
         * page de lecture d'une leçon
         */
        readLessonPage: {url: '/lesson/:slug', pathName: 'ReadLesson'},

        uploadFilePage: '/users/editor/upload/lesson-file',
        updateUserRolePage: '/users/admin/update-user-role',
        resetDatabasePage: '/users/super-admin/reset-database'
    }
};
export default utils;