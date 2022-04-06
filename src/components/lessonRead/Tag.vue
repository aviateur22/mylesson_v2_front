<template>
  <div class="tag">
      <span>{{ data.name }}</span>
  </div>
</template>

<script>
export default {
    name: 'tag',
    props: ['data']
};
</script>

<style scoped>
    .tag{      
        text-transform: uppercase;
        font-weight: 800;
        font-size: var(--text_s);
        padding: 0px 10px;
        padding-bottom: 10px;
        color: rgb(211, 208, 208);

    }

</style>