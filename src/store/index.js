import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import flashMessage from './module/flashMessage';
import user from './module/user';
import tag from './module/tag';
import confirmation from './module/confirmation';
import actionHandler from './module/actionHandler';
import axiosApi from './module/axios';
import lesson from './module/lesson';
import modal from './module/modal';
import link from './module/link';
import loader from './module/loader';
import cgu from './module/footerPage/cgu';
import cookieBanner from './module/cookieBanner';
import aboutMePresentation from './module/footerPage/aboutMePresentation';
import cookiePresentation from './module/footerPage/cookiePresentation';
import legalNotice from './module/footerPage/legalNotice';
import lessonPresentation from './module/footerPage/lessonPresentation';
import markdownPresentation from './module/footerPage/markdownPresentation';
import thematic from './module/thematic';
import admin from './module/admin';
import notification from './module/notification';

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    modules: {    
        user,
        flashMessage,
        tag,      
        confirmation,
        modal,
        actionHandler,        
        axiosApi,
        lesson,
        link,
        loader,
        cgu,
        cookieBanner,
        aboutMePresentation,
        cookiePresentation,
        legalNotice,
        lessonPresentation,
        markdownPresentation,
        thematic,
        admin,
        notification
    }
});
