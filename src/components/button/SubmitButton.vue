<template>
    <button :disabled='disableLoginButton' :class="{'button--inactif' :disableLoginButton}" class="button button--primary" type="submit">
        <span :class="{'wrap_text': wrapText}">{{ textSubmitButton }}</span>
    </button>     
</template>

<script>
export default {
    name: 'SubmitButton',
    props: ['textSubmitButton', 'disableLoginButton', 'wrapText'],
};
</script>

<style scoped>
</style>