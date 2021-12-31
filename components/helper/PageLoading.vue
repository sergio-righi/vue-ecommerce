<template>
  <gv-flexbox class="page-loading" justify="center" align="center">
    <gv-progress-circle indeterminate :size="50" />
  </gv-flexbox>
</template>

<script>
export default {};
</script>

<style scoped>
.page-loading {
  height: 100%;
}
</style>
