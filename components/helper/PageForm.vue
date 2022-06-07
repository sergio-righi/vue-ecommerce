<template>
  <form @submit.prevent="onSubmit">
    <slot />
    <gv-row>
      <gv-col>
        <gv-button submit primary>
          {{ isUpdate ? $t('action.update') : $t('action.create') }}
        </gv-button>
      </gv-col>
    </gv-row>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const Props = Vue.extend({
  props: {
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
})

@Component
export default class PageForm extends Props {
  onSubmit(event: any) {
    this.$emit('onsubmit', event)
  }
}
</script>
