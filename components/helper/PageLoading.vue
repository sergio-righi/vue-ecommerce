<template>
  <gv-flexbox class="page-loading" justify="center" align="center">
    <gv-progress-circle indeterminate :size="50" />
  </gv-flexbox>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageLoading extends Vue {}
</script>

<style scoped>
.page-loading {
  height: 100%;
}
</style>
