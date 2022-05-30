<template>
  <div class="delete__lesson-container">
      <SubmitButton @click="removeUserPrivilege" :textSubmitButton="'supprimer les privilèges de l\'utilisateur'"/>
  </div>
</template>

<script>
import SubmitButton from '../../button/SubmitButton.vue';
export default {
    name: 'banishUser',
    components: {
        SubmitButton
    },
    props: ['token'],
    methods: {
        /** supression des privileges */
        async removeUserPrivilege(){
            /** formdata */
            const formData = new FormData();

            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            formData.append('token', this.token.token);
            
            await this.$store.dispatch('actionHandler', {action: 'removeUserPrivilegeByUserLogin', formData: Object.fromEntries(formData.entries()) });
        }
    }
};
</script>

<style>

</style>