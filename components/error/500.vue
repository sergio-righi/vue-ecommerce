<template>
  <div class="error-container" :class="bg">
    <div class="error-content">
      <div class="error-code">500</div>
      <div class="error-message">
        {{ $t("page.error.500") }}
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
  name: "error-500",
  props: {
    error: {
      type: Object,
      default: () => {},
    },
    bg: {
      type: String,
      required: true,
    },
  }
};
</script>
