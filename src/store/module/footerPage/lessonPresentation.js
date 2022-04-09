const state = {     
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
    }
};

const getters = {   
    /** renvoie ma description */
    getLessonPresentation: (state)=>state.lessonPresentation
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