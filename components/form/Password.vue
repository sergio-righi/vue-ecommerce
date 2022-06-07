<template>
  <gv-row>
    <gv-col sm="6">
      <gv-input
        id="password"
        v-model="password"
        v-validation.required
        :label="$t('label.password')"
        :type="inputType"
      >
        <template #trailing>
          <gv-button primary sm tabindex="-1" @onclick="visible = !visible">
            <gv-icon v-if="!visible" value="eye-off" />
            <gv-icon v-else value="eye" />
          </gv-button>
        </template>
      </gv-input>
    </gv-col>
    <gv-col sm="6">
      <gv-input
        v-model="confirmation"
        v-validation.match="'#password'"
        :label="$t('label.password')"
        type="password"
      />
    </gv-col>
  </gv-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { crypto } from '@/utils'

const Props = Vue.extend({
  props: {
    value: {
      type: String,
      default: null,
    },
    required: Boolean,
  },
})

@Component
export default class Password extends Props {
  visible: boolean = false
  confirmation: string = ''
  password: string = this.value

  get isSuccess(): boolean {
    return this.hasValue && this.match
  }

  get isError(): boolean {
    return this.hasValue && !this.match
  }

  get hasValue(): boolean {
    return !!this.confirmation && !!this.password
  }

  get match(): boolean {
    return this.password === this.confirmation
  }

  get inputType(): string {
    return this.visible ? 'text' : 'password'
  }

  @Watch('match')
  onMatchChanged(value: boolean) {
    if (this.hasValue) {
      this.$emit('onchange', !value)
    }
  }

  @Watch('password')
  onPasswordChanged(value: string) {
    this.$emit('input', crypto.encrypt(value))
  }
}
</script>
