<template>
 <div class="menu__container">
     <!-- bouton menu -->
     <section class="menu__button-section">
         <div @click="toggleMenuVisibility" class="loader__container">
            <!--Loader -->
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>    
     </section>  
    <!-- menu option -->
    <transition name="slide-fade">
        <section v-if="menuVisbility" class="menu__section">
            <ul class="menu__option">
                <li @click="notificationRead" class="menu__option-item">vue</li>
                <li @click="notificationDelete" class="menu__option-item">supprimer</li>
            </ul>
     </section>
    </transition>     
 </div>
</template>

<script>
export default {
    name: 'markdownAction',
    props: ['data', 'key'],
    data(){
        return {
            /** visibilité du menu */
            menuVisbility: false,

        };
    },
    methods: {
        /** toggle menu */
        toggleMenuVisibility(){
            this.menuVisbility = !this.menuVisbility;
        },

        /** lecture notification */
        async notificationRead(){
            /** id utilisateur */
            const userId = this.$store.getters.getUserIdent.id;

            /** id de la notification */
            const notificationId = this.data.id;

            const formData = new FormData();            
            formData.append('userId', userId);

            /** requête lecture notification */
            await this.$store.dispatch('actionHandler', {action: 'readNotificationById', formData, notificationId});
            
            /** suppression couleur bleu de la notification*/
            this.$emit('notificationRead', true);

            /**masque le menu */
            this.toggleMenuVisibility();
        },

        /** suppression notification */
        async notificationDelete(){
            /** id utilisateur */
            const userId = this.$store.getters.getUserIdent.id;

            /** id de la notification */
            const notificationId = this.data.id;

            const formData = new FormData();            
            formData.append('userId', userId);

            /** requête suppression notification */
            await this.$store.dispatch('actionHandler', {action: 'deleteNotificationById', formData, notificationId});            
            
            /**mise à jour de l'affichage des notifications */
            this.$emit('updateNotificationList');

            /**masque le menu */
            this.toggleMenuVisibility();
        }
    }

};
</script>

<style scoped>
    .menu__container{
        display: flex;
        position: relative;
    }
    .loader__container{       
        text-align: center;        
        width: 40px;    
        height: 40px;    
        display: flex;        
        align-items: center;
        justify-content: center;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        border-radius: 50%;
        padding: 10px 0px;
        cursor: pointer;
        background: white;

    }

    .spinner {        
        width: 100px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .spinner > div {
        width: 3px;
        height: 3px;
        background-color:var(--main_color_small);
        border-radius: 100%;
        display: inline-block;
        margin: 2px;        
    }

    .spinner .bounce1 {  
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    .menu__section{
        position: absolute;
        right: 45px;
        top:0px;
        background: white;
    }
    .menu__option{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
    }

    .menu__option-item{
        width: 100%;
        padding: 0.2em;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
        cursor: pointer;
    }

    .menu__option-item:hover{
        background-color: rgb(228, 228, 228);
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>