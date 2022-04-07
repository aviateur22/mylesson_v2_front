import { createRouter, createWebHistory } from 'vue-router';
import utils from '../helper/utils';
import HomPage from '../views/HomePage.vue';
import store from '../store';

const routes = [
    /** home page */
    {
        path: utils.apiDataUrl.homePage.url,
        name: utils.apiDataUrl.homePage.pathName,
        component: () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue')
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
    /** ma présentation */   
    {
        path: utils.apiDataUrl.abouteMe.url,
        name: utils.apiDataUrl.abouteMe.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/FooterPage/Me.vue');
        }
    },
    /** a propos des lecons */   
    {
        path: utils.apiDataUrl.lessonPresentation.url,
        name: utils.apiDataUrl.lessonPresentation.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/FooterPage/LessonPresentation.vue');
        }
    },
    /** a propos du markdwon */   
    {
        path: utils.apiDataUrl.aboutMarkdown.url,
        name: utils.apiDataUrl.aboutMarkdown.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/FooterPage/AboutMarkdown.vue');
        }
    },
    /** lien internet pour approffondir le markdown */   
    {
        path: utils.apiDataUrl.linksMarkdown.url,
        name: utils.apiDataUrl.linksMarkdown.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/FooterPage/MarkdownLinks.vue');
        }
    },
    /** cgu */   
    {
        path: utils.apiDataUrl.cgu.url,
        name: utils.apiDataUrl.cgu.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/FooterPage/CGU.vue');
        }
    },
    /** cookie */   
    {
        path: utils.apiDataUrl.cookie.url,
        name: utils.apiDataUrl.cookie.pathName,
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/FooterPage/Cookie.vue');
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
