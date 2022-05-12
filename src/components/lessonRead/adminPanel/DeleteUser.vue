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
            
            /**token */
            formData.append('formToken', this.token);

            /**suppression user */
            await this.$store.dispatch('actionHandler', {action: 'deleteUserByLogin', formData: Object.fromEntries(formData.entries())});
        }
    }
};
</script>

<style>

</style>