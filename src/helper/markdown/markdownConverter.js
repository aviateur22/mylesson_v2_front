import showdown from 'showdown';
class MarkdownHandler{    
    converter;
    bindings;

    classMap = {
        // p: 'markdown-body',
        h1: 'markdown-body',
        h2: 'markdown-body',
        h3: 'markdown-body',
        h4: 'markdown-body',
        h5: 'markdown-body',
        h6: 'markdown-body',
        pre: 'markdown-body',
        ul: 'markdown-body',
        li: 'markdown-body',
        blockquote: 'markdown-body',
        code: 'markdown-body',
        strong: 'markdown-body'
    }

    /**
     * Permets d'inserer des modifications dans le markdown
     * @returns Inutile pour le momement
     * 
     */
    #setBinding(){
        return Object.keys(this.classMap)
        .map(key => ({
            type: 'output',
            regex: new RegExp(`<${key}(.*)>`, 'g'),
            replace: `<${key} class="${this.classMap[key]}" $1>`
        }));
    };

    getHtml(text){
        if(!this.converter){
            this.converter = new showdown.Converter();       
        }
        const html = this.converter.makeHtml(text);
        return html;
    };
}
export default MarkdownHandler;