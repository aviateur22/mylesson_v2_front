import { createRouter, createWebHistory } from 'vue-router';
import utils from '../helper/utils';
import HomPage from '../views/HomePage.vue';
import store from '../store';

const routes = [
    /** home page */
    {
        path: utils.apiDataUrl.homePage.url,
        name: utils.apiDataUrl.homePage.pathName,
        component: () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue'),
        meta: {
            title: 'my lesson | accueille',
            metaTags: []
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    /** page de connexion */
    {
        path: utils.apiDataUrl.loginPage.url,
        name: utils.apiDataUrl.loginPage.pathName,
        meta: {
            title: 'my lesson | connexion',
            requiresUnauthenticated: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/Login.vue');
        }
    },
    /** page d'inscription */
    {
        path: utils.apiDataUrl.signupPage.url,
        name: utils.apiDataUrl.signupPage.pathName,
        meta: {
            title: 'my lesson | inscription',
            requiresUnauthenticated: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/Signup.vue');
        }
    },
    /** page d'accueil utilisateur apres la connexion */
    {
        path: utils.apiDataUrl.homeAccountPage.url,
        name: utils.apiDataUrl.homeAccountPage.pathName,
        meta: {
            title: 'my lesson | mon compte',
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/HomeAccount.vue');
        }
    },
    /** page modification des données utilisateur */
    {
        path: utils.apiDataUrl.infoPage.url,
        name: utils.apiDataUrl.infoPage.pathName,
        meta: {
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/userInformation.vue');
        }

    },
    {
        path: utils.apiDataUrl.resetPasswordPage,
        name: 'LostPassword',
        meta: {
            requiresUnauthenticated: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/LostPassword.vue');
        }
    },
    /**Selection type de nouvelle leçon */
    {
        path: utils.apiDataUrl.addLessonTypePage.url,
        name: utils.apiDataUrl.addLessonTypePage.pathName,
        meta: {
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/AddLessonSelectionType.vue');
        }
    },
    /**page d'édition d'une leçon */
    {
        path: utils.apiDataUrl.addMarkdownLessonPage.url,
        name: utils.apiDataUrl.addMarkdownLessonPage.pathName.toString(),
        meta: {
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/LessonMarkdownPage.vue');
        }
    },
    /**update d'une lecon */
    {
        path: utils.apiDataUrl.updateLessonPage.url,
        name: utils.apiDataUrl.updateLessonPage.pathName,
        meta: {
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/LessonMarkdownPage.vue');
        }
    },
    /**Affichge d'une leçon en lecture seule */
    {
        path: utils.apiDataUrl.readLessonPage.url,
        name: utils.apiDataUrl.readLessonPage.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/LessonRead.vue');
        }

    },
    /**page d'affichages des lecons d'un utilisateur */
    {
        path: utils.apiDataUrl.userLessonPage.url,
        name: utils.apiDataUrl.userLessonPage.pathName,
        meta: {
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/LessonPage.vue');
        }
    },
    {
        path: utils.apiDataUrl.uploadFilePage,
        name: 'UploadFile',
        meta: {
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/NewUploadFile.vue');
        }
    }, 
    /** page d'article des footers */   
    {
        path: utils.apiDataUrl.footerArticle.url,
        name: utils.apiDataUrl.footerArticle.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/FooterArticlePage.vue');
        }
    },
    /**Page admin gérer les demande des utilisateurs */
    {
        path: utils.apiDataUrl.updateUserRolePage.url,
        name: utils.apiDataUrl.updateUserRolePage.pathName,
        meta: {
            title: 'my lesson | ajout de privilège',
            requiresAdminPrivilege: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/adminPage/userUpgradeRoleRequestPage.vue');
        }
    },
    /** Page pour voirs les contenu des lecon abusif */
    {
        path: utils.apiDataUrl.lessonCheckPage.url,
        name: utils.apiDataUrl.lessonCheckPage.pathName,
        meta: {
            title: 'my lesson | vérification des leçons',
            requiresAdminPrivilege: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/adminPage/LessonCheckPage.vue');
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',        
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/404.vue');
        } 
    }          
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    /** vérification  Page Title */
    const DEFAULT_PAGE_TITLE = 'my lesson';
    document.title = to.matched.some(record => record.meta.title) ? to.meta.title : DEFAULT_PAGE_TITLE;
        
    if(to.matched.some(record => record.meta.requiresAuth)) {             
        //verification autorisation d'affichage de page    
        if(store.getters.getUserIdent.userAuthenticated){             
            return next();
        }
        store.commit('setFlashMessageMut',
            {
                visibility: true,
                error: true,
                message: 'Vous devez être connecté pour acceder à cette page'
            });                   
        next({name: 'Login'});
    /** page avec admin privilege */                
    } else if(to.matched.some(record=>record.meta.requiresAdminPrivilege)){
        //verification privilege 
        if(!store.getters.getUserIdent.userAuthenticated){             
            store.commit('setFlashMessageMut',
                {
                    visibility: true,
                    error: true,
                    message: 'Vous devez être connecté pour acceder à cette page'
                });                   
            return next({name: 'Login'});
        }

        //verification privilege 
        if(store.getters.getUserIdent.roleId < 3){             
            store.commit('setFlashMessageMut',
                {
                    visibility: true,
                    error: true,
                    message: 'Vous ne pouvez pas accéder a cette page'
                });                   
            return next({name: 'HomePage'});
        }

        return next();
    } else if(to.matched.some(record => record.meta.requiresUnauthenticated)){
        if(store.getters.getUserIdent.userAuthenticated){
            store.commit('setFlashMessageMut',
                {
                    visibility: true,
                    error: true,
                    message: 'Impossible de se connecter a cette page'
                });
            // console.log(store.getters.getFlashMessage);
            return next({name: 'UserHomeAccount'});
        }
        // qconsole.log(`user is not authenticated and can access ${to.path}`);
        return next();
    } else {
        next();
    }
});
export default router;
