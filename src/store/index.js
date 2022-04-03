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
        loader
    }
});
