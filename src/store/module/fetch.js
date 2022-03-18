/**
 * Centralisation des requêtes API
 */
import utils from '../../helper/utils';
const state = {     
};

const getters = {   
};

const actions = {
    /**
     * 
     * @param {Object} data      
     * @property {string} data.endPoint- point d'acces
     * @property {htmlElement} [data.form] - formulaire [optionnelle | null]
     * @property {string} [data.fetchMethod] - méthode requête - [optionnelle | POST]
     * @property {object} [data.data] - données a envoyer - [optionnel|null]
     * @returns {Object} fetchResult
     */
    async fetchAction({commit, getters}, data){
        /**données pour le requete */
        let fetchData;

        /**données en provenance d'un formulaire */
        if(data?.form){
            const formData = new FormData(data.form);
            fetchData = Object.fromEntries(formData.entries());               
        } else {
            fetchData = data.data;
        }

        const uri = utils.baseUri + data.endPoint;
        const setting = {                
            method: data.fetchMethod ? data.fetchMethod.toUpperCase() : 'POST',
            //Permet de renvoyer les cookies lors de la demande
            credentials: 'include',
            headers: {
                'User-Ident': getters.userIdentGet.id ? getters.userIdentGet.id : '',
                mode: 'cors',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchData)
        };

        /**fetch */
        const fetchRequest = await fetch(uri, setting);
        const result = await fetchRequest.json();

        /** réinitialisation des parametres de l'application */
        if(result.resetAuth){
            commit('',);
        }

        /**Erreur requete fetch ou statusCode: error dans le corps de la reponse*/
        if(result.error){
            commit('setFlashMessageMut', { error: true, message: result.message }); 
        }
        /** renvoie de la donnée */
        return result;                 
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
