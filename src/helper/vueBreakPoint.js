const vueBreakPoint = {    
    /**
     * breakpoint mobile
     */
    breakPoint: {
        mobile: '768'       
    },

    /**
     * Définie si mobile size atteind
     */
    mobileBreakPoint: (screenSize)=>{
        if(Number(screenSize) <= Number(vueBreakPoint.breakPoint.mobile)){
            return true;
        }
        return false;
    },

    /**
     * Vérifie la taile de l'écran par rapport a une taille de choisie
     * @param {Number} actualScreenSize - taille actuelle de l'écran
     * @param {Number} customSize - taille selectionné pour la comparaison
     * @returns 
     */
    customBreakPoint: (actualScreenSize, customSize)=>{
        if(Number(actualScreenSize) <= Number(customSize)){
            return true;
        }
        return false;
    }
};
export default vueBreakPoint;