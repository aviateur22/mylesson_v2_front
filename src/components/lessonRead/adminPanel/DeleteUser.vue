<template>
    <div>
        <SubmitButton @click="deleteUser" :textSubmitButton="'supprimer l\'utilisateur'"/>
    </div>
</template>

<script>
import SubmitButton from '../../button/SubmitButton.vue';
export default {
    name: 'deleteUser',
    props: ['token'],
    components: {
        SubmitButton
    },
    methods: {
        /**suppression utilisateur */
        async deleteUser(){
            /** formdata */
            const formData = new FormData();
            
            /** ajout du token */
            if(!this.token){
                return this.$store.commit('setFlashMessageMut', { error: true, message: 'impossible d\'accéder au token'});
            }
            
            formData.append('token', this.token.token);
            formData.append('secret', this.token.secret);

            /**suppression user */
            await this.$store.dispatch('actionHandler', {action: 'deleteUserByLogin', formData: Object.fromEntries(formData.entries())});
        }
    }
};
</script>

<style>

</style>