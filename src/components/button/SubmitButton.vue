<template>
    <button :disabled='disableLoginButton' :class="{'button--inactif' : disableLoginButton }" class="button button--primary" type="submit">{{ textSubmitButton }}</button>    
</template>

<script>
export default {
    name: 'SubmitButton',
    props: ['textSubmitButton', 'disableLoginButton'],
};
</script>