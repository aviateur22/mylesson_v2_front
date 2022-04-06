<template>
  <div v-if="visibility" class="flash__container">
      <div class="flash">
          <div class="flash__message-container" :class="{flash__error:  flashMessage.error}">
              <span class="flash__message-text">{{ flashMessage.message }}</span>
          </div>
      </div>
  </div>
</template>

<script>

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

    .flash__container{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 10px;
    }    

    .flash{        
        width: 100%;
    }

    .flash__message-container{
        border: 1px solid inherit;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(122, 199, 46,0.7);
        border:0.5px solid green;
        color: white;
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 700;
    }

    .flash__message-text{
        padding: 15px 10px;
        white-space: pre-wrap;
        font-size: var(--text_button_size);
    }

    .flash__error{
        background: rgba(255, 25, 0, 0.7) !important;
        border:0.5px solid red !important;
    }

    @media screen and (min-width:768px) {
       
        .flash{        
            width: 700px;                     
        }
    }

    @media screen and (min-width:1024px) {       

    }

</style>
