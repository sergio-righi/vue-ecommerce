<template>
  <div class="product-info">
    <div class="wrapper">
      <div class="title" v-if="hasTitle">
        <slot name="title" />
      </div>
      <div class="icon" v-if="hasIcon">
        <slot name="icon" />
      </div>
      <div class="footnote" v-if="hasFootnote">
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
