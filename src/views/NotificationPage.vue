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
              <section class="notification__list" v-else>
                  <NotificationComponent @updateNotificationList="updateNotificationList" v-for="(notification, i) in notifications" :key="i" :data="notification"/>
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
            notifications: []
        };
    },
    components: {
        NotificationComponent
    },
    methods: {
        /**récupération des notifiaction */
        async getAllNotification(){
            const notifications = await this.$store.dispatch('actionHandler', {action: 'getNotificationByUserId'});
            this.notifications = notifications.notifications;
        },

        /**mise a jour des notificatrion */
        updateNotificationList(){
            this.notifications = [];
            this.getAllNotification();
        }
    },
    created(){
        this.getAllNotification();
    }
};
</script>

<style scoped>
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

    .notification__list{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

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