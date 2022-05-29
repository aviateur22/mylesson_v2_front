// import cookies from './cookies';

// class CookieHandler {
//     /**
//      * 
//      * @param {*} cName 
//      * @returns 
//      */
//     getCookie = (cookieName) => {
//         const name = cookieName + "=";
//         const cDecoded = decodeURIComponent(document.cookie);
//         const cArr = cDecoded.split('; ');
//         let res;
//         cArr.forEach(val => {
//           if (val.indexOf(name) === 0) res = val.substring(name.length);
//         })
//         return res
//     };

   
//     /**
//      * creation cookie
//      * @param {*} cookieTypeName 
//      * @param {*} cookieValue 
//      */
//     setCookie = (cookieTypeName , cookieValue) =>{

//         //Verification du type de cookie
//         const cookie = cookies.find(cookie => cookie.cookieTypeName === cookieTypeName);

//         if(cookie){           

//             //duréé du cookie 24h
//             const date=new Date();
//             date.setTime(date.getTime() + 24 * 60 * 60 *1000);
//             const expires = "; expires=" + date.toGMTString();

//             document.cookie = `${cookie.cookieName}=${cookieValue} ${expires} ; path ='/'`

//         }
//     };


//     /**
//      * Suppression du cookie
//      * @param {string} cookieName 
//      */
//     eraseCookie(cookieName) {

//         //Vérification si deja existant
//         const findCookie = this.getCookie(cookie.cookieName);
//         const cookieValue ='';

//         //Suppression
//         if(findCookie){

//             const date = new Date();
//             date.setTime(date.getTime() + -1 * 24 * 60 * 60 *1000);
//             const expires = "; expires=" + date.toGMTString();

//             document.cookie = `${cookieName}=${cookieValue} ${expires} ; path ='/'`
//         }
        
//     };

//     /**
//      * Renvoie le nom du cookie en fonction du type
//      */
//     findCookieName =(cookieTypeName)=>{

//         //recherche du nom par rapport au type de cookie
//         const cookieName = cookies.find(cookie => cookie.cookieTypeName === cookieTypeName).cookieName

//         console.log(cookieName);
//         //recherche du cookie dans le navigateur
//         const cookieFind = this.getCookie(cookieName);
//         console.log(cookieFind);
//         return cookieFind;
//     };
// }

// module.exports = CookieHandler;