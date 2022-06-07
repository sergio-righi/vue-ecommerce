<template>
  <gv-snackbar
    left
    :timeout="0"
    :message="contentMessage"
    :action="$t('action.undo')"
    @onclick="onUndo"
    @onHide="onHide"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SnackbarUndo extends Vue {
  @Prop({}) message!: string;
  @Prop({ default: () => 1 }) onUndo!: Function;
  @Prop({ required: false, default: () => 1 }) onHide!: Function;

  get reference() {
    return this.$children[0];
  }

  get contentMessage() {
    return `${this.message} ${this.$t("message.snackbar.restore")}`;
  }
}
</script>
