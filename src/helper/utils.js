//import router from './../router'
/**
 * Donnée API
 */
const utils = {
    baseUri: 'https://mylessonapp.herokuapp.com',
    //baseUri: 'http://localhost:3000',

    /** utilisateurs */
    userApi: {        
        login: { endPoint: '/api/users/login', method: 'post' },
        register: { endPoint: '/api/users', method: 'post' },
        logout: { endPoint: '/api/users/logout', method: 'post' },
        updatePasswordById: { endPoint: '/api/users/password/:id', method: 'patch' },
        getUserById: { endPoint: '/api/users/:id', method: 'get' },
        updateUserById: { endPoint: '/api/users/:id', method: 'patch' },
        deleteUserById: { endPoint: '/api/users/:id', method: 'delete' },
        getAllUser: { endPoint: '/api/users', method: 'get' },
        getAvatarByKey: {endPoint: '/api/users/image/:key', method: 'get'},
        getAutorAvatarByKey: {endPoint: '/api/users/image/autor/:key', method: 'get'},   
        updateImageByUserId: {endPoint: '/api/users/image/:userId', method: 'patch'}    
    },
    /** lessons */
    lessonApi: {
        getTokenByUserId: { endPoint: '/api/lessons/token/:userId', method: 'get' },
        createLesson: { endPoint: '/api/lessons', method: 'post' },
        getLessonById: { endPoint: '/api/lessons/:id', method: 'post' },
        updateLessonById: { endPoint: '/api/lessons/:id', method: 'patch' },
        deleteLessonById: { endPoint: '/api/lessons/:id', method: 'delete' },
        getLessonByUser: { endPoint: '/api/lessons/user/:id', method: 'get' },
        getAllLesson: { endPoint: '/api/lessons', method: 'get' },
        getLessonByTag: { endPoint: '/api/lessons/filter/tags', method: 'post' },   
        getLessonBySlug: { endPoint: '/api/lessons/slug/:slug', method: 'get' },   
    },
    /**tags */
    tagApi: {
        findTagByName: { endPoint: '/api/tags/name/:name', method: 'get' },
        getTagById: { endPoint: '/api/tags/:id', method: 'get' },
        updateTagById: { endPoint: '/api/tags/:id', method: 'patch' },
        deleteTagById: { endPoint: '/api/tags/:id', method: 'delete' },
        addTag: { endPoint: '/api/tags', method: 'post' }

    },
    /** media link */
    linkApi: {
        getLinkByName: {endPoint: '/api/links/name/:media', method: 'get'},
        saveLinkByUserId: {endPoint: '/api/links/user/:userId', method: 'post'},
        getAllLink: { endPoint: '/api/links/', method: 'get'},
        deleteLinkByUserId: { endPoint: '/api/links/user/:userId', method: 'delete'}
    },
    /**liens des path - url pour l'affichage des pages*/
    apiDataUrl: {
        /** page principal - accueil */
        homePage: { url: '/', pathName: 'HomePage' },

        /** Login */
        loginPage: { url: '/login', pathName: 'Login'},

        /** Register */
        signupPage: { url: '/signup', pathName: 'Signup' },
        
        /** page principal utilisateur apres connexion */
        homeAccountPage: { url: '/users/home', pathName: 'UserHomeAccount' },
        
        /** page d'information sur un utilisateur */
        infoPage: { url: '/users/account', pathName: 'UserInformation'},
        
        /** page listant les leçon d'un utilisateur */
        userLessonPage: {url: '/users/lesson', pathName: 'UserLessonPage'}, 

        /** type de leçon a ajouter (markdown ou downloadfile) */
        addLessonTypePage: {url: '/users/editor/lesson-type-selection', pathName: 'AddLessonSelection'},

        /** page d'édition d'une lecon markdown */
        addMarkdownLessonPage: {url: '/users/editor/add/lesson-markdown', pathName: 'AddMarkdownLesson'},

        /** page d'update d'une leçon existante */
        updateLessonPage: {url: '/users/editor/update/markdown-lesson/:slug', pathName: 'UpdateLesson'},

        /** page de lecture d'une leçon */
        readLessonPage: {url: '/lesson/:slug', pathName: 'ReadLesson'},

        /** lien footer - ma presentation */
        abouteMe: { url: '/aboute-me', pathName: 'AbouteMe'},

        /** lien footer - conteneu des lecons */
        lessonPresentation: { url: '/lesson-presentation', pathName: 'AboutLesson'},

        /** lien footer - a propos du markdown */
        aboutMarkdown: { url: '/markdown-presentation', pathName: 'AboutMarkdown'},

        /** lien footer - lien markdwon */
        linksMarkdown: { url: '/markdown-link', pathName: 'MarkdownLink'},

        /** lien footer - a propos du markdown */
        cgu: { url: '/information-cgu', pathName: 'CGU'},

        /** lien footer - lien markdwon */
        cookie: { url: '/information-cookie', pathName: 'Cookie'},

        uploadFilePage: '/users/editor/upload/lesson-file',
        updateUserRolePage: '/users/admin/update-user-role',
        resetDatabasePage: '/users/super-admin/reset-database',
        deleteAccountPage: '/users/delete-account',
        resetPasswordPage: '/reset-password',
    }
};
export default utils;