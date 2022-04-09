const state = {     
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
    }
};

const getters = {   
    /** renvoie ma description */
    getMarkdownPresentation: (state)=>state.markdownPresentation
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