<template>
  <div class="notification__main-container">
      <article class="notification__container">
          <header class="notification__header">
              <h2 class="notification__title">
                  notifications
              </h2>
          </header>
          <main class="main">
              <section v-if="notifications.length <= 0">
                  <p> Pas de notification</p>
              </section>
              <section class="notification__section"  v-else>
                  <transition-group name="list">
                    <NotificationComponent @updateNotificationList="updateNotificationList" v-for="(notification, i) in notifications" :token="token" :key="notification" :data="notification" :index="i"/>
                  </transition-group>
              </section>
          </main>
      </article>      

  </div>
</template>

<script>
import NotificationComponent from '../components/notification/NotificationContainer.vue';
export default {
    data(){
        return {
            /** liste des notifications */            
            notifications: [],

            /**token */
            token: undefined
        };
    },
    components: {
        NotificationComponent
    },
    methods: {
        /**
         * récupération des notifiaction
         */
        async getAllNotification(){
            /**formdata por token */
            const formData = new FormData();

            /**token pour soumission */
            formData.append('token', this.token.token);

            const notifications = await this.$store.dispatch('actionHandler', {action: 'getNotificationByUserId', formData: Object.fromEntries(formData.entries())});

            if(notifications){
                /** mise a jour de la liste des notifications */
                this.notifications = notifications.notifications;
            }            
        },

        /**
         * mise a jour de la liste des notification aprés suppression
         */
        updateNotificationList(index){
            this.notifications.splice(index, 1);
        },

        /** récupération d'un token */
        async getToken(){
            /**génération token  */
            const token = await this.$store.dispatch('actionHandler', {action: 'createToken'});            

            if(!token?.dataToken){
                return;
            }
                       
            /** token */
            this.token = token.dataToken;
        },

        /**mise a jour du nombre de notification */
        async notificationCount(){
            const formData = new FormData();       

            /**token pour soumission */
            formData.append('token', this.token.token);

            /**mise a jour des notification */
            await this.$store.dispatch('actionHandler', { action: 'countNotificationUnreadByUserId', formData: Object.fromEntries(formData.entries()) });
        }
    },
    async created(){
        /** génération token */
        await this.getToken();

        /** récupération des notifications */
        this.getAllNotification();

        /**mise a jour du nombre de notification */
        this.notificationCount();
    }
};
</script>

<style scoped>    
    .item {
        width: 100%;
        height: 30px;
        background-color: #f3f3f3;
        border: 1px solid #666;
        box-sizing: border-box;
    }
    .notification__main-container{
        margin-top:var(--navbar_height) ;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
    }

    .notification__container{
        width: 100%;
        min-height: calc( 100vh - var(--navbar_height));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .notification__title{
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--form_title_size);
        padding:40px 0px
    }

    .main{
        flex-grow: 2;
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 10px;
    }

    .notification__section{
        width: 100%;

    }
    .notification__list{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }
    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 1s;        
    }
    .list-enter,
    .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(30px);
    }

    .list-leave-active {
        position: absolute;

    }

    @media screen  and (min-width: 768px) {
        .notification__container{
            width: 768px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }        
    }

    @media screen and (min-width: 1024px){
        .notification__container{
            width: 1024px;           
        }          
    }

</style>