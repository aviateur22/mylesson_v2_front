/**
 * Centralisation des requêtes API
 */
import utils from '../../helper/utils';
import axios from 'axios';
const state = {     
};

const getters = {   
};

const actions = {
    /**
     * 
     * @param {Object} data      
     * @property {string} data.endPoint- URL point d'acces pour la requete
     * @property {htmlElement} [data.formData] - formulaire [optionnelle | null]
     * @property {string} [data.method] - méthode requête - [optionnelle | POST]
     * @property {object} [data.data] - données a envoyer - [optionnel|null]
     * @returns {Object} fetchResult
     */

    async axiosFetchAction({commit}, data){  
        /** affichage d'une fenetre de chargement */
        commit('setLoaderState', true);

        const request = await axios({
            withCredentials: true,
            baseURL: utils.baseUri,
            url: data.endPoint,
            method: data.method,     
            responseType: data.responseType ? data.responseType : 'json',              
            data: data.formData,           
        });   

        /** masque la fenetre de chargement */
        commit('setLoaderState', false);
        return request.data;       
    }
};

const mutations = {   
};

export default {
    state,
    getters,
    actions,
    mutations
};
