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
    }
};
export default vueBreakPoint;