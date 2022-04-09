const state = { 
    aboutMe: {
        title: 'a propos de moi',
        articles: [
            {
                title: 'Qui je suis',
                content: `Je suis Cyrille, développeur junior de 38ans.<br> 
                        j'ai fais une reconvertion professionnelle dans le développement web durant l'année 2021-2022`,
                links: [
                    {
                        title: 'mon portfolio',
                        link: 'https://cyrillecade.netlify.app/'
                    }
                ]
            },
            {
                title: 'Ce que j\'ai fais',
                content: `Pationné par l'aéronautique, j'ai travaillé 15 ans dans le transport aérien.<br><br>
                j'ai été formé à l'ENAC dans la fillière Agent d'exploiatation promotion 2004. <br>
                J'ai travaillé en tant que technicien d'opération chez Air Méditerrannée et Airbus. <br><br>
                En 2005 sont apparus mes premiers petits bout de code sous excel. Et depuis le code ne m'a jamais quitté.
                J'ai approffondi mes connaissances à la sueur de mes recherches et de longues heures de debug.....<br><br>
                j'ai exploré Excel, VBA , VB, C# , XAMARIN, G.A.S, JAVASCRIPT, CSS, HTML, PHPj `
            },
            {
                title: 'Ma reconversion en tant que développeur web javascript',
                content: `je devais pouvoir associer ma vie privée avec mon envie de devenir développeur.<br> <br> 
                Comment pouvoir quitter temporairement mon travail, financer ma formation, conserver un salaire et être présent à la maison pour m'occuper de la famille? <br> <br> 
    
                <p class="article__strong"> 6 mois sans travail: </p>
                j'ai déposé un demande de congé de formation auprès de mon employeur.<br>
                Vérifier les conditions et votre élligibilité a cette demande. Je vous conseille de faire cette étape avec beaucoup d'anticipation <br><br>
    
                
                <p class="article__strong"> Le salaire et la prise en charge de ma formation: </p>
                J'ai réussi a tou faire prendre en charge par l'oganisme TRANSITION PRO.
                J'ai du préparer un dossier. c'est un travail important de collecte d'info. j'ai mis 2 bon mois avant de pouvoir être satisfait de mon travail.<br> 
                Soyez convaincant et montrer que vous êtes décidé et motivé. <br> 
                C'est une sélection par dossier, alors faite le bien.<br> 
                Il y a d'autres solutions de financement. Renseignez-vous.<br> <br> 
    
                <p class="article__strong">  Ma formation: </p>
                j'ai recherché une formation en télé-présentielle (le tèrme technique est FOAD). <br>
                Cela permets d'avoir des cours la journée avec des professeurs tout en restant à la maison.
                J'ai jetté mon dévolu sur l'école O'Clock. 6 mois de formation intensif.<br><br><br>
                
                <p class="article__strong">POUR PLUS D'INFORMATION:</p><br>`,
                links: [
                    {
                        title: 'le congé de formation',
                        link: 'https://www.service-public.fr/particuliers/vosdroits/F14018'
                    },
                    {
                        title: 'transition pro',
                        link: 'https://www.transitionspro-occitanie.fr/'
                    },
                    {
                        title: 'formation à distance avec oclock',
                        link: 'https://oclock.io/'
                    }
                ]
            }
        ]
    }
};

const getters = {   
    /** renvoie ma description */
    getAboutMePresentation: (state)=>state.aboutMe
};

const actions = {   
};

const mutations = {   
};

export default {
    state,
    getters,
    actions,
    mutations
};
