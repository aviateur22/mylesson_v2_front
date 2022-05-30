<template>
<!-- titre de la partie -->
    <section class="information__title-container">
        <h2 class="information__title">Votre position </h2>
    </section>
    <!-- role utilisateurutilisateur -->
    <section class="role__container">
        <div class="role__text-container">
            <span class="role__text">vous êtes un <strong class="role__text-strong">{{userRole}}</strong></span>
        </div>   
        <!-- upgrade du status -->
        <div v-if="this.getUserRole <= 1" class="upgrade__container">
            <div class="form__button-container">
                <SubmitButton :disableLoginButton="this.requestUpgradeRole" @click.prevent="requestUpgrade" textSubmitButton="devenir éditeur de leçons"/>
            </div>
            <div v-if="this.requestUpgradeRole === true">
                <p class="role__upgrade-text"> votre demande est prise en compte </p>

            </div>
        </div>                   
    </section>
</template>

<script>
import SubmitButton from '../button/SubmitButton.vue';
export default {
    name: 'userRole',
    components: {
        SubmitButton
    },
    data(){
        return {
          
        };
    },
    props: ['token'],
    methods: {
        /**demande pour éditer des lecons */
        async requestUpgrade(){            
            /** formdata pour le formulaire */
            const data = new FormData();

            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            data.append('token', this.token.token);

            const formData = Object.fromEntries(data.entries());  
            /**demande d'édition */
            await this.$store.dispatch('actionHandler', { action: 'requestUserUpgrade', formData });
        }

    },
    computed: {
        /**role utilisateur */
        getUserRole(){
            return this.$store.getters.getUserIdent.roleId;
        },

        /** role utilisateur en formatet text */
        // eslint-disable-next-line vue/return-in-computed-property
        userRole(){
            switch (this.getUserRole){
            case 1: return 'utilisateur';
            case 2: return 'éditeur';
            case 3: return 'admin';
            case 4: return 'superAdmin';
            default: return 'utilisateur';
            }
        },
        
        /**
         * status demande upgrade privilge utilisateur
         */
        requestUpgradeRole() {
            return this.$store.getters.getUserProfilData.requestRoleUpgrade;
        }
    }
};
</script>

<style scoped>
    .information__title-container{  
        padding-top: 20px;      
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .information__title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
    }

    .role__container{      
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; 
        width: 100%; 
        padding: 0px 20px;
        padding-bottom: 40px;
        border-bottom: 0.1px solid gray;
    }

    .role__text-container{
        display: flex;
        align-items: center;
        justify-content: center;       
        border:0.5px solid var(--main_color); 
        border-radius: 10px;
        width: 100%;
        padding: 20px 0px;
    }

    .upgrade__container{
        width: 100%
    }

    .role__text{
        text-transform: uppercase;
        font-size: var(--text_button_size);
    }

    .role__text-strong{
        font-weight: 700;
    }

    .form__button-container{
     padding-top: 20px;
    }

    .role__upgrade-text{
        padding-top: 1em;
        color: green;
        font-size: var(--text_button_size);
        text-transform: uppercase;
        font-weight: 800;
        letter-spacing: 2px;
    }

</style>