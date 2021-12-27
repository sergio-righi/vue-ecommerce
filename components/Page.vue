<template>
  <section class="section-page">
    <section class="section-header" v-if="hasTitle || hasHeader">
      <div class="section-title" v-if="hasTitle || hasAction">
        <span>{{ title }}</span>
        <div class="section-action" v-if="hasAction">
          <slot name="action" />
        </div>
      </div>
      <slot name="header" />
    </section>
    <section class="section-filter" v-if="hasFilter">
      <slot name="filter" />
    </section>
    <section class="section-content" v-if="hasContent">
      <slot name="content" />
    </section>
    <section class="section-footer" v-if="hasFooter">
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
