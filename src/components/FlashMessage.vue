<template>
  <div v-if="visibility" class="main__container">
      <div class="container">
          <div class="flash__message-container" :class="{flash__error:  flashMessage.error}">
              <span class="flash__message-text">{{ flashMessage.message }}</span>
          </div>
      </div>
  </div>
</template>

<script>

import {mapActions, mapMutations, mapGetters, Store} from 'vuex';
export default {
    name: 'FlashMessage',
    data() {
        return {
            timeOut: 3000,
            visibility: false
        };
    },
    methods: { 
        /**
         * fermeture de du flashMessage
         */
        closureMessage() {
            setTimeout(()=>{
                this.visibility = false;
                this.flashMessage.message = '';
            }, this.timeOut);
        }
    },
    computed: {   
        flashMessage() {
            return this.$store.getters.getFlashMessage;
        }
    },
    watch: {
        /**
         * detection d'un flash Message
         */
        flashMessage: function(newMessage, oldMessage){
            /**Affichage du flashMessage */
            this.visibility = true;
            /**Fermeture du flashMessage */
            this.closureMessage();
        }
    }
};
</script>

<style scoped>

    .main__container{
        width: 100%;
    }
    .container{

        width: 90%;
        margin:0px auto;      
    } 

    .flash__message-container{
        border: 1px solid inherit;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: green;
        color: white;
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 700;
    }

    .flash__message-text{
        padding: 15px 10px;
        white-space: pre-wrap
    }

    .flash__error{
        background: red !important;
    }

</style>
