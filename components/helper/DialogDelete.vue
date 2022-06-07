<template>
  <gv-dialog>
    <gv-dialog-item>
      <template #header>
        {{ $t('message.dialog.confirmation.title') }}
      </template>
      <template #content>
        <p>
          {{ $t('message.dialog.confirmation.content') }}
        </p>
      </template>
      <template #footer>
        <gv-button @onclick="onCancel">{{ $t('action.cancel') }}</gv-button>
        <gv-button primary @onclick="onCallback">
          {{ $t('action.delete') }}
        </gv-button>
      </template>
    </gv-dialog-item>
  </gv-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DialogDelete extends Vue {
  @Prop({ default: () => {} }) onConfirm!: Function

  get reference(): any {
    return this.$children[0]
  }

  onCallback() {
    this.reference.close()
    this.onConfirm()
  }

  onCancel() {
    this.reference.close()
  }
}
</script>
