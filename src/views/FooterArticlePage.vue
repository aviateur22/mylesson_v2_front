<template>
    <div class="footer__article-page">
        <div class="footer__article-container">
            <div class="footer__article-title">
                <!-- titre principal de la page -->
                <h2 class="footer__title">
                    {{ activeData.title }}
                </h2>
            </div>
            <div class="footer__page-article">
                <!-- articles avec chacun: 1 titre et 1 contenu  -->
                <FooterArticleComponent v-for="(article, i) in activeData.articles" :data="article" :key="i"/>
            </div>
        </div>        
    </div>
</template>

<script>
import FooterArticleComponent from '../components/footer/FooterArticle.vue';
import utils from '../helper/utils';
export default {
    name: 'abouteMe',
    components: {
        FooterArticleComponent
    },
    props: ['articles', 'title'],
    data(){
        return {            
            /** données pour ma présentation */
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
            },

            /** données présentation des leçons */
            lessonPresentation: {
                title: 'présentation des leçons',
                articles: [
                    {
                        title: 'De quoi s\'agit t-il',
                        content: `durant ma formation, j'ai écris de nombreuses fiches reflexs. <br>
                                   Aujourd'hui je me suis lancé un défi. Pouvoir créer un site complet en javascript et partager mes fiches.<br><br>
                                   Pourquoi ne pas donner la possibilité aux autres personnes, de pouvoir créer leur propre fiche reflex et ainsi partager leur connaissance. <br>
                                   j'ai développer à l'aide de la libraire <span class="article__strong"> SHOWDOWN</span> un éditeur <span class="article__strong"> MARKDOWN </span>`
                    },
                    {
                        title: 'Contenu des leçons',
                        content: ` Mes fiches sont du condensé d'information.
                                    On retrouve des thêmes comme le javascript, nodejs. Il y a aussi des ORM et des exemples de déploiement avec AWS`
                    },
                    {
                        title: 'Comment sont faitent les leçons',
                        content: ` Toutes mes fiches sont fait en MARKDOWN. C'est un language génial pour mettre en forme de manière simple du text.<br>
                                    j'ai créé un éditeur permettant de faire du <span class="article__strong"> MARKDOWN </span> <br>
                                    <span class="article__strong"> Toutes les leçons publiés sont disponible au public. </span>`
                    },
                    {
                        title: 'Toi aussi tu veux partager tes connaissances?',
                        content: `<span class="article__strong"> Bientôt on pourra tous partager nos connaissance </span> </br>
                                  N'hesité pas en m'envoyé un email si cela vous interesse à : <span class="article__strong"> ctoutweb@gmail.com </span>  `
                    }
                ]
            },

            /** le markdown */
            markdownPresentation: {
                title: 'le markdown',
                articles: [
                    {
                        title: 'De quoi s\'agit t-il',
                        content: `Le MARKDOWN est un language utilisé en informatique, permettant une mise forme simple est rapide.
                                On peut facielement créer des paragraphes, titres, images, mettre du gras, faire des liens..
                                `
                    },
                    {
                        title: ' Quelques liens pour approndir vos connaissances',
                        content: 'Je vous propose quelques liens interéssant: <br> <br>',
                        links: [
                            {
                                title: 'le markdown selon wikipedia',
                                link: 'https://fr.wikipedia.org/wiki/Markdown'

                            },
                            {
                                title: 'apprendre le markdwon avec github',
                                link: 'https://www.markdowntutorial.com/fr/'

                            },
                            {
                                title: 'le markdown en video avec de Grafikart',
                                link: 'https://grafikart.fr/tutoriels/markdown-377'

                            },
                            {
                                title: 'la documentation officielle du markdown',
                                link: 'https://www.markdownguide.org/'
                            }
                        ]
                    }
                ]
            },

            /** information légal */
            legalNotice: {
                title: 'mentions légales',
                articles: [
                    {
                        title: 'Publication',
                        content: `ce site est publié par la société CTOUTWEB <br>
                        RCS 911 273 852 <br>
                        directeur Cyrille Cadé <br>
                        contact ctoutweb@gmail.com <br>
                        AUTERIVE 31190 <br>
                        Hebergeur: Front-end netlify - back-end heroku`
                    }
                ]
            },

            /** les cookies */
            cookiePresentation: {
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
            },

            /** cgu */
            cguPresentation: {
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
            },

            /** données retenu pour affichage de l'article */
            activeData: {}
        };
    },
    methods: {
        /** récuperation du slug présent dans l'url */
        getSlug(){
            const slug = this.$route.params.slug;

            if(!slug){
                /** faire un message comme quoi le contenu n'est pas trouvé */
                this.$route.push({ name: utils.apiDataUrl.notFound.url });
            }

            /** chargement du contenu de la page */
            this.activeData = this.getArticleData(slug);           
        },

        /** récupération de données  pour la page*/
        getArticleData(slug){            
            switch (slug){
            /** about me data */
            case utils.apiDataUrl.abouteMe.slug: 
                return this.aboutMe;        

            /** presentation des lecons */        
            case utils.apiDataUrl.lessonPresentation.slug:
                return this.lessonPresentation;
            
            /** le markdown */
            case utils.apiDataUrl.aboutMarkdown.slug:
                return this.markdownPresentation;
            
            /** informations légal */
            case utils.apiDataUrl.legalNotice.slug:
                return this.legalNotice;

            /** les cookies du sites */
            case utils.apiDataUrl.cookie.slug:
                return this.cookiePresentation;

            /**cgu */    
            case utils.apiDataUrl.cgu.slug:
                return this.cguPresentation;

            default:
                return null; 
            }
        }
    },
    created(){
        this.getSlug();
    }
};
</script>

<style scoped>
    .footer__article-page{
        margin-top:var(--navbar_height) ;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .footer__article-container{
        display: flex;
        flex-direction: column;
        min-height: calc( 100vh - var(--navbar_height));
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .footer__article-title{
        display: flex;
        width: 100%;
        align-items: flex-start;
        justify-content: center;
        padding-top: 20px;
        padding-bottom: 40px;
    }

    .footer__title{
        text-transform: uppercase;
        font-size: var(--form_title_size);
        padding-top: 30px;
    }

    .footer__page-article{
        flex-grow: 3;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        flex-direction: column;
    }

    @media screen and (min-width:768px) {

        .footer__article-container{        
            width: 768px;          
        }
    }

    @media screen and (min-width:1024px) { 
        .footer__article-container{
            width: 1024px;
        }

    }
</style>