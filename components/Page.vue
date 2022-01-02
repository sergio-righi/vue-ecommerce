<template>
  <section class="section-page">
    <section v-if="hasTitle || hasHeader" class="section-header">
      <div v-if="hasTitle || hasAction" class="section-title">
        <span>{{ title }}</span>
        <div v-if="hasAction" class="section-action">
          <slot name="action" />
        </div>
      </div>
      <slot name="header" />
    </section>
    <section v-if="hasFilter" class="section-filter">
      <slot name="filter" />
    </section>
    <section v-if="hasContent" class="section-content">
      <slot name="content" />
    </section>
    <section v-if="hasFooter" class="section-footer">
      <slot name="footer" />
    </section>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
  },
  computed: {
    hasHeader() {
      return !!this.$slots.header || this.hasAction;
    },
    hasAction() {
      return !!this.$slots.action;
    },
    hasFilter() {
      return !!this.$slots.filter;
    },
    hasContent() {
      return !!this.$slots.content;
    },
    hasFooter() {
      return !!this.$slots.footer;
    },
    hasTitle() {
      return !!this.title;
    },
  },
};
</script>

<!--<style lang="scss">
@import "scss/components/page.scss";
</style>-->
