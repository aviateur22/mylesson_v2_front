import { createRouter, createWebHistory } from 'vue-router';
import utils from '../helper/utils';
import HomPage from '../views/HomePage.vue';
import store from '../store';

const routes = [
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
    {
        path: '/login',
        name: 'Login',
        meta: {
            requiresUnauthenticated: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/Login.vue');
        }
    },
    {
        path: utils.apiDataUrl.signupPage,
        name: 'Signup',
        meta: {
            requiresUnauthenticated: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/Signup.vue');
        }
    },
    {
        path: utils.apiDataUrl.homeAccountPage,
        name: 'UserHomeAccount',
        meta: {
            requiresAuth: true
        },
        component: function() {
            return import(/* webpackChunkName: "about" */ '../views/HomeAccount.vue');
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
        if(store.getters.userIdentGet.userAuthenticated){             
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
        if(store.getters.userIdentGet.userAuthenticated){
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
