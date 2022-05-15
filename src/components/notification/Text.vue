<template> 
  <p class="notification__text">{{text}}</p>
</template>

<script>
export default {
    name: 'notificationText',
    props: ['text']
};
</script>

<style scoped>
    .notification__text{
        display: flex;
        width: 100%;        
        font-size: var(--text_s);
        text-transform: uppercase;
        font-weight: 700;
    }

</style>--text_s