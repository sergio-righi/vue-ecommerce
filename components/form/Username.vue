<template>
  <gv-input
    v-model="username"
    v-mask="'a*'"
    :error="validation"
    :label="$t('label.username')"
    :data-validation-message="$t('validation.duplicate')"
    minlength="5"
    required
    @blur="checkUsername"
  />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

const Props = Vue.extend({
  props: {
    id: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
  },
})

@Component
export default class Username extends Props {
  validation: boolean = false
  username: string = this.value

  @Watch('validation')
  onValidationChanged(value: string) {
    this.$emit('onchange', value)
  }

  @Watch('username')
  onUsernameChanged(value: string) {
    this.$emit('input', value)
  }

  async checkUsername(event: any) {
    this.validation = await this.$service.user.exists(this.id, {
      username: event.target.value,
    })
  }
}
</script>
