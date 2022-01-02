<template>
  <gv-snackbar
    ref="snackbar"
    left
    :timeout="0"
    :message="message"
    :action="$t('action.undo')"
    @onclick="onUndo"
    @onHide="onHide"
  />
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
    onUndo: {
      type: Function,
      required: true,
    },
    onHide: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    reference: function () {
      return this.$refs.snackbar;
    },
  },
};
</script>
