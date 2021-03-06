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
        updateImageByUserId: {endPoint: '/api/users/image/:userId', method: 'patch'},
        requestUpgradeUserRole: {endPoint: 'api/users/request-upgrade-privilege/:userId', method: 'post'},
        sendEmailPasswordLost: {endPoint: '/api/users/lost-password/:email', method: 'post'},
        resetPasswordByUserId: { endPoint: '/api/users/reset-password', method: 'post'}

    },
    /**admin */
    adminApi: {
        getUsersUpgradeRoleRequest: { endPoint: '/api/admin/upgrade-request', method: 'get'},
        updateUserRole: { endPoint: '/api/admin/upgrade-user/:userId', method: 'patch'},
        removeUserPrivilegeByUserLogin: { endPoint: '/api/admin/remove-privilege/by-user-login/:userLogin', method: 'post'},   
        removeUserPrivilegeByUserId: { endPoint: '/api/admin/remove-privilege/by-user-id/:userId', method: 'post'},
        getAbusiveLesson: { endPoint: '/api/admin/abusive-content', method: 'get'},
        deleteUserByLogin: { endPoint: '/api/admin/delete-user/:userLogin', method: 'post'},
        deleteUserById: { endPoint: '/api/admin/delete-user/:userId', method: 'post'},
        abusiveContentCount: { endPoint: '/api/admin/count/abusive-content', method: 'get' },
        upgradeRequestCount: { endPoint: '/api/admin/count/upgrade-request', method: 'get' },
        deleteLessonById: { endPoint: '/api/admin/delete-lesson/:lessonId', method: 'delete'},
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
        getlessonHtmlFromMarkdown: { endPoint: '/api/lessons/converter/get-html', method: 'post' },  
        adminRequest: { endPoint: '/api/lessons/admin-request/:lessonId', method: 'post'}
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
    /** media thematic */
    thematicApi: {
        getAllThematic: {endPoint: '/api/thematics', method: 'get'}
    },
    /** notifications */
    notificationApi: {
        createNotification: { endPoint: '/api/notifications', method: 'post'},
        deleteNotification: { endPoint: '/api/notifications/:notificationId', method: 'delete'},
        findNotificationByUserId: {endPoint: 'api/notifications/notification-by-user/:userId', method: 'post'},
        countNotificationByUserId: {endPoint: '/api/notifications/notification-by-user/count/:userId', method: 'post'},
        readNotificationById: { endPoint: '/api/notifications/read/:notificationId', method: 'patch'}
    },
    /**token  */
    tokenApi: {
        createTokenForm: { endPoint: 'api/tokens/:userId', method: 'post'},
        createTokenVisitor: { endPoint: 'api/tokens/visitor', method: 'get'},
        createTokenLessonEditor: { endPoint: 'api/tokens/lesson-editor/:userId', method: 'post' }
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

        /** page pour le chargement des articles du footer */
        footerArticle: { url: '/information/:slug', pathName: 'FooterArticlePage'},

        /** page pour afficher les utilisateurs voulant devenir éditeur de lecons */
        updateUserRolePage: { url: '/admin/users-upgrade-request', pathName: 'UsersRoleUpgradeRequest'},

        /** avec lecon a checker par un admin */
        lessonCheckPage: { url: '/admin/check-lesson', pathName: 'LessonCheckPage'},

        /** page de notification */
        notificationPage: { url: '/users/notification', pathName: 'NotificationPage'},

        /** page pour envoyer un eamil de réinitialisation de mot de passe */
        passwordLostPage: { url: '/lost-password', pathName: 'passwordLostPage' },

        /** page réinitialisation mot de passe perdu */
        resetLostPasswordPage: { url: '/users/reset-password/user/:userId/data/:data/param/:param', pathName: 'ResetLostPasswordPage'},

        /** article static footer - ma presentation */
        abouteMe: { slug: 'about-me' },

        /** article static footer - slug conteneu des lecons */
        lessonPresentation: { slug: 'lesson'},

        /** article static footer - slug propos du markdown */
        aboutMarkdown: { slug: 'markdown'},

        /** article static footer - slug liens markdwon */
        linksMarkdown: { slug: 'markdown-link'},

        /** mention légal */
        legalNotice: { slug: 'legal-notice'},

        /** article static footer - slug propos du markdown */
        cgu: { slug: 'cgu'},

        /** article static footer - slug lien markdwon */
        cookie: { slug: 'cookie'},

        /** page 404 */
        notFound: { url: '/:pathMatch(.*)*', pathName: '404'},

        uploadFilePage: '/users/editor/upload/lesson-file',       
        
        resetDatabasePage: '/users/super-admin/reset-database',
        deleteAccountPage: '/users/delete-account',
        
    }
};
export default utils;