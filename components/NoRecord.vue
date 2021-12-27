<template>
  <div class="no-record-container">
    <div class="no-record-icon">
      <slot name="icon" v-if="hasIcon" />
      <gv-icon v-else value="database-search-outline" />
    </div>
    <div class="no-record-description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  computed: {
    hasIcon() {
      return !!this.$slots.icon;
    },
    description() {
      return this.message ?? this.$t("message.feedback.no_record");
    },
  },
};
</script>

<!--<style lang="scss">
@import "scss/pages/no_record.scss";
</style>-->
