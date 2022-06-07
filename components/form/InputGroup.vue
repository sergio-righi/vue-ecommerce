<template>
  <gv-row>
    <gv-col v-for="item in items" :key="item._id" :sm="6" :md="4">
      <gv-input-box
        v-model="values"
        v-bind="$attrs"
        :val="item.value"
        :checkbox="!radio"
      >
        {{ item.text }}
      </gv-input-box>
    </gv-col>
  </gv-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

const Props = Vue.extend({
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
    radio: Boolean,
  },
})

@Component
export default class InputGroup extends Props {
  values: any = [...this.value]

  @Watch('values')
  onValueChanged(value: string) {
    this.$emit('input', value)
  }
}
</script>
