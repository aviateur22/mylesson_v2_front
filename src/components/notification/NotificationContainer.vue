<template>
  <div class="notification">
    <div :class="{unread__color: notificationData.new}" class="main__content">        
       <!-- text de notifcation -->
        <section class="notification__text">
            <NotificationComponent :text="notificationData.text"/>
        </section>
        <!-- menu -->
        <section class="notification__menu">
            <MenuComponent :token="token" :data="data" @updateNotificationList="updateNotificationList" @notificationRead="notificationRead"/>
        </section>
    </div>   
  </div>
</template>

<script>
import NotificationComponent from './Text.vue';
import MenuComponent from './Menu.vue';
export default {
    name: 'notification',
    data(){
        return {
            notificationData: undefined,
        };
    },
    props: ['data', 'index', 'token'],
    components: {
        NotificationComponent,
        MenuComponent
    },
    methods: {
        /**
         * lecture de la notification
         */
        notificationRead(){
            this.notificationData.new = false;
        },
        
        /**
         * mise a jour de la liste des notifications
         */
        updateNotificationList(){            
            this.$emit('updateNotificationList', this.index);
        }

    },
    created(){
        this.notificationData = this.data;
    }

};
</script>

<style scoped>
    .notification{
        width: 100%;   
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .main__content{
        width: 90%;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em 1em;
    }

    .unread__color{
        background-color: rgb(232, 245, 255);
    }
</style>