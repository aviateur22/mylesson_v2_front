import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import flashMessage from './module/flashMessage';
import user from './module/user';
import lessonEditor from './module/lessonEditor';
import lessonList from './module/lessonList';
import tag from './module/tag';
import fetch from './module/fetch';
import modal from './module/modal';
import home from './module/home';
import lessonDisplay from './module/lessonDisplay';
import actionHandler from './module/actionHandler';
import lessonReader from './module/lessonReader';

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    modules: {    
        user,
        flashMessage,
        lessonEditor,
        lessonList,
        tag,
        fetch,
        modal,
        home,
        lessonDisplay,
        actionHandler,
        lessonReader
    }
});
