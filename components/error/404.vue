<template>
  <div class="error-container" :class="bg">
    <div class="error-content">
      <div class="error-code">
        404
      </div>
      <div class="error-message">
        {{ $t("page.error.404") }}
      </div>
    </div>
    <div class="error-footer">
      {{ $t("message.footnote.error") }}
      <gv-link href="/" muted>{{ $t("message.footnote.domain") }}</gv-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-404",
  props: {
    error: {
      type: Object,
      default: () => {}
    },
    bg: {
      type: String,
      required: true
    }
  }
};
</script>

<!--<style lang="scss">
@import "scss/pages/error.scss";
</style>-->
