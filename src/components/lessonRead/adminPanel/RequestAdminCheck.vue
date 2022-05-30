<template>
<!-- demande le controle de la lecon par un admin -->
  <div v-if="this.$store.getters.getUserIdent.userAuthenticated" class="main__container">
      <article class="article">          
          <main class="article__main">
                <input @click="requestAdminCheck" type="checkbox" id="checkbox" v-model="check">
                <label class="article__main-text" for="checkbox"> contenu abusif </label>
          </main>
      </article>

  </div>
</template>

<script>
export default {
    name: 'requestAdminCheck',
    props: ['token'],
    data(){
        return {
            check: undefined,
        };
    },
    methods: {
        /** modification etat adminCheck de la lecon */
        async requestAdminCheck(){           
            const formData = new FormData();

            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            formData.append('token', this.token.token);

            await this.$store.dispatch('actionHandler', {action: 'adminRequest', formData: Object.fromEntries(formData.entries())});            
        }
    },
    computed: {
        /**
         * status adminRequest
         */
        checked() {            
            return this.$store.getters.getLessonEditor.adminRequest;                
        }
    },
    watch: {
        /**Watch changement adminRequest*/
        checked: function(newValue, oldValue){
            this.check = newValue; 
        }
    }
};
</script>

<style scoped>
    .main__container{
        background: rgb(243, 243, 243);
        padding: 2em;
    }

    .article__main{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .article__main-text{
        padding-left: 1em;
        text-transform: uppercase;
        font-weight: 800;
        color: var(--secondary_color);
    }

</style>