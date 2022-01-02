<template>
  <div class="product-info">
    <div class="wrapper">
      <div v-if="hasTitle" class="title">
        <slot name="title" />
      </div>
      <div v-if="hasIcon" class="icon">
        <slot name="icon" />
      </div>
      <div v-if="hasFootnote" class="footnote">
        <slot name="footnote" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasIcon() {
      return !!this.$slots.icon;
    },
    hasTitle() {
      return !!this.$slots.title;
    },
    hasFootnote() {
      return !!this.$slots.footnote;
    },
  },
};
</script>
