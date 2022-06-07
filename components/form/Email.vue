<template>
  <gv-input
    v-model="email"
    v-validation.required.email="{
      error: { value: validation, message: $t('validation.duplicate') },
    }"
    :error="validation"
    :label="$tc('label.email', 1)"
    @onblur="checkEmail"
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
    ignore: Boolean,
  },
})

@Component
export default class Email extends Props {
  validation: boolean = false
  email: string = this.value

  @Watch('validation')
  onValidationChanged(value: string) {
    this.$emit('onchange', value)
  }

  @Watch('email')
  onEmailChanged(value: string) {
    this.$emit('input', value)
  }

  async checkEmail(event: any) {
    if (this.ignore) return
    this.validation = await this.$service.user.exists(this.id, {
      username: event.target.value,
    })
  }
}
</script>
