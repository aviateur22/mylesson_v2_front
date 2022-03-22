/**
 * données lecture leçon
 */
const state = { 
    lessonState: null
};

const getters = {   
    lessonStateGet: (state)=>state.lessonState,
};

const actions = {
};

const mutations = { 
    setLessonStateMut: (state, value)=>(state.lessonState = value),
};

export default {
    state,
    getters,
    actions,
    mutations
};