const state = { 
    cookie: {
        title: 'les cookies',
        articles: [
            {
                title: 'C\'est quoi un cookie',
                content: `Selon wikipedia : <br>
                        Un cookie, témoin de connexion1,2 ou témoin1,2, est défini par le protocole de communication HTTP comme étant un petit texte envoyé par un serveur HTTP à un client HTTP, que ce dernier renverra les prochaines fois qu'il se connectera aux serveurs partageant le même nom de domaine. <br>
                        Inventé en 1994, le témoin de connexion est un texte contenant une suite arbitraire de paires clé-valeur. Il permet aux sites web de suivre les internautes lorsqu'ils passent d'une page à l'autre du site, voire lorsqu'ils reviennent quelques jours plus tard dans le cas des cookies enregistrés sur le terminal du visiteur. <br>
                        Les cookies sont notamment utilisés pour identifier la session d'un internaute connecté à son compte informatique. Plus généralement, les cookies servent à lier à une visite toute information d'état, comme des préférences d'affichage ou le contenu d'un panier d'achat.
                        Les cookies ont toujours été plus ou moins controversés car ils permettent de suivre les internautes visitant des sites Web apparemment sans rapport, du moment que ces sites utilisent tous le même fournisseur de pistage web, par exemple un diffuseur de publicité.<br>
                        La plupart des navigateurs Web permettent aux utilisateurs de gérer les cookies (durée de stockage, suppression sélective). Les sites Web obéissant à la directive du 12 juillet 2002 sur la protection de la vie privée dans le secteur des communications électroniques permettent aussi aux internautes d'accepter sélectivement les cookies.
                        Étant généralement stockés dans de simples fichiers texte, les cookies ne sont pas exécutables. Ils ne sont ni des logiciels espions ni des virus. Toutefois, les cookies qui ne servent qu'au pistage sont détectés par plusieurs logiciels antivirus qui proposent de les effacer`,
                links: [
                    {
                        title: 'source wikipedia',
                        link: 'https://fr.wikipedia.org/wiki/Cookie_(informatique)'
                    }
                ],
            },
            {
                title: 'Y a t-il des cookies dans MY LESSON',
                content: `oui , pour fonctionner, <span class="article__strong">MY LESSON</span> utilise des cookies. <br>
                Ils ont pour but de permettre de vous <span class="article__strong"> connecter</span> et de vous <span class="article__strong"> authentifier lors de requêtes vers notre back-end </span>`
            },
            {
                title: 'Peut-il y avoir des cookies en provenance de d\'autres domaines dans MY LESSON?',
                content: 'non , actuellement il n\'est pas prévu d\'inclure des scripts externes'
            }
        ]
    }
};

const getters = {   
    /** renvoie ma description */
    getCookiePresentation: (state)=>state.cookie
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