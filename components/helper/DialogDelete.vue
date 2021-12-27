<template>
  <gv-dialog ref="dialog">
    <gv-dialog-item>
      <template #header>
        {{ $t("message.confirmation.title") }}
      </template>
      <template #content>
        <p>
          {{ $t("message.confirmation.delete") }}
        </p>
      </template>
      <template #footer>
        <gv-button @onclick="onCancel">{{ $t("action.cancel") }}</gv-button>
        <gv-button primary @onclick="onConfirm">
          {{ $t("action.delete") }}
        </gv-button>
      </template>
    </gv-dialog-item>
  </gv-dialog>
</template>

<script>
export default {
  props: {
    onConfirm: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onCancel: function () {
      this.reference().close();
    },
    reference: function () {
      return this.$refs.dialog;
    },
  },
};
</script>
