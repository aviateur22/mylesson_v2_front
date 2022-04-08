/** contenu des CGU */;
const state = {     
    cgu: {
        title: 'CGU',
        articles: [
            {
                title: 'article 1: définition',
                content: `<span class="article__strong"> UTILISATEUR </span> : personne qui utilise le site <br>
                        <span class="article__strong"> MEMBRE </span>: un utilsateur devient membre lorqu'il est identifié sur le site <br <br>
                        <span class="article__strong"> COMPOSITEUR </span>: un membre devient compositeur lorsqu'il est gratifié.<br>
                                                                            un compositeur a la possibilité d'éditer et publier ses propres leçons <br>
                        <span class="article__strong"> DONNEES </span>: données transmise par un membre ou utilisateur au sein du site `
            },
            {
                title: 'article 2: acces aux services',
                content: `Le site est accessible gratuitement en tout lieu, à toute utilisateur ayant un acces internet. <br>
                Tous frais de connexion pour accéder au service sont à la charge de l'utilisateur <br> <br>
                <span class="article__strong">L'utilisateur</span> non <span class="article__strong"> membre </span> n'a pas acces aux services réservés aux membres.<br>
                <span class="article__strong"> Un membre </span> non <span class="article__strong"> compositeur </span> n'a pas acces aux services réservés aux compositeurs <br> <br>
                L'accés aux services du site peut s'interrompre a tout moment, sans préavis.<br>
                Tout dysfonctionnement (mineur ou majeu) du réseau ou server n'engage pas la responsabilité de <span class="article__strong"> MY LESSON </span> <br>
                <span class="article__strong"> MY LESSON </span> se donne le droit de supprimer tout contenu sans préavis. En cas de perte de données <span class="article__strong"> MY LESSON </span> ne cerait être tenu responsable <br>
                Un membre ne recoit aucune justification, ni notification préalable à la suppression ou modification de son contenu <br>

                `
            },
            {
                title: 'article 3: propriété intellectuelle',
                content: `Marques, logos, signes et tout autre contenu du site font l'object d'une protection par le Code de la propriété intellectuelle et droit d'auteur <br>
                        l'utilisateur s'engage à une utilisation du site dans un cadre strictement privé. L'utilisation des contenus à des fins commerciales est strictement interdite<br>
                        Tout contenu mis en ligne par l'utilisateur est de sa seule responsabilité. L'utilisateur s'engage à ne pas mettre en ligne des contenus pouvant porter atteinte aux onterêt de tierces personnes.<br>
                        Tout recours en justice engagé par un tiers contre le site, sera pris en charge par l'utilisateur`
            },
            {
                title: 'article 4: données personnelles',
                content: `les données demandées à l'inscription sont nécessaire et obligatoire pour la création d'un compte utilisateur.<br>
                        L'utilisation de l'email pourra être utilisé pour la gestion de nos services <br>
                        <span class="article__strong"> MY LESSON </span> assure un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi N°78-17 du 6 janvier 1978 <br>
                        l'utilisateur dispose d'un droit d'acces, de rectification, de suppression et d'opposition de ses données personnelles. L'utilisateur exerce se droit par mail à : ctoutweb@gmail.com`,
                links: [
                    {
                        title: 'plus d\'info sur la loi N°78-17',
                        link: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460/'
                    }
                ]

            },
            {
                title: 'article 5: responsabilité et publication par l\'utilisateur',
                content: ` Les sources des informations diffusées sur le site sont réputées fiables. Toutefois, <span class="article__strong"> MY LESSON </span> se réserve la faculté d'une non-garantie de la fiabilité des sources. <br> <br>
                        Les informations données sur le site sont à titre purement informatif. Ainsi,l'Utilisateur assume seul l'entière responsabilité de l'utilisation des informations et contenus.<br>                                
                        L'Utilisateur assume les risques liés à l'utilisation de son identifiant et mot de passe. <span class="article__strong"> MY LESSON </span> décline toute responsabilité. <br> <br>                         
                        Tout usage du service par l'Utilisateur ayant directement ou indirectement pour conséquence des dommages doit faire l'objet d'une indemnisation au profit du site.<br> <br>                               
                        Une garantie optimale de la sécurité et de la confidentialité des données transmises n'est pas assurée par <span class="article__strong"> MY LESSON </span>. <br>
                        Toutefois, <span class="article__strong"> MY LESSON </span> s'engage à mettre en œuvre tous les moyens nécessaires afin de garantir au mieux la sécurité et la confidentialité des données.<br><br>
                        La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.
                `
            },
            {
                title: 'article 6: liens hypertextes',
                content: `De nombreux liens hypertextes sortants sont présents sur le site,cependant les pages web où mènent ces liens n'engagent en rien la responsabilité de <span class="article__strong"> MY LESSON </span> qui n'a pas le contrôle de ces liens.
                L'Utilisateur s'interdit donc à engager la responsabilité du site concernant le contenu et les ressources relatives à ces liens hypertextes sortants.`
            },
            {
                title: 'article 7: durée',
                content: 'la durée de ce présent contrat est indeterminée. Le contrat produit ses effet a l\'égard de l\'utilisateur à compter de l\'utilisation de <span class="article__strong"> MY LESSON </span>'
            },
            {
                title: 'article 8: évolution des CGU',
                content: 'Le site se réserve à tout moment le droit de modifier les clauses stipulées dans le présent contrat.'
            }
        ]

    }
};

const getters = {   
    /** renvoie les CGU */
    getCgu: (state)=>state.cgu
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
